import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { requireAdminApi } from "@/lib/api-security";
import {
  parseProjectFormData,
  validateImage,
} from "@/lib/project-validation";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

function safeExtension(file: File) {
  return (
    {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/avif": "avif",
    }[file.type] ?? "bin"
  );
}

async function uploadImage(
  supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>,
  file: File,
  folder: string
) {
  validateImage(file);
  const path = `${folder}/${randomUUID()}.${safeExtension(file)}`;
  const { error } = await supabase.storage
    .from("project-images")
    .upload(path, file, { contentType: file.type, cacheControl: "31536000", upsert: false });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return path;
}

function refreshProjectPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAdminApi(request);
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await context.params;
    const formData = await request.formData();
    const input = parseProjectFormData(formData);
    const uploadedPaths: string[] = [];
    const removedPaths: string[] = [];
    const folder = `${input.slug}-${id}`;

    try {
      let coverPath = input.existingCoverPath;
      const coverFile = formData.get("coverImage");
      if (coverFile instanceof File && coverFile.size > 0) {
        const newPath = await uploadImage(auth.supabase, coverFile, folder);
        uploadedPaths.push(newPath);
        if (coverPath) removedPaths.push(coverPath);
        coverPath = newPath;
      }
      if (!coverPath) throw new Error("A cover image is required.");

      const galleryPaths = [...input.existingGalleryPaths];
      const galleryFiles = formData
        .getAll("galleryImages")
        .filter((item): item is File => item instanceof File && item.size > 0);
      if (galleryPaths.length + galleryFiles.length > 12) {
        throw new Error("Keep no more than 12 gallery images.");
      }
      for (const file of galleryFiles) {
        const path = await uploadImage(auth.supabase, file, folder);
        uploadedPaths.push(path);
        galleryPaths.push(path);
      }

      const { data: previous } = await auth.supabase
        .from("projects")
        .select("slug, gallery_paths")
        .eq("id", id)
        .single();
      const oldGallery = (previous?.gallery_paths as string[] | null) ?? [];
      removedPaths.push(...oldGallery.filter((path) => !galleryPaths.includes(path)));

      const { error } = await auth.supabase
        .from("projects")
        .update({
          slug: input.slug,
          title: input.title,
          category: input.category,
          description: input.description,
          long_description: input.longDescription,
          cover_image_path: coverPath,
          gallery_paths: galleryPaths,
          tags: input.tags,
          features: input.features,
          description_ar: input.descriptionAr,
          long_description_ar: input.longDescriptionAr,
          features_ar: input.featuresAr,
          live_url: input.liveUrl,
          completion_date: input.completionDate,
          client: input.client,
          display_order: input.displayOrder,
          is_published: input.isPublished,
        })
        .eq("id", id);

      if (error) throw new Error(error.message);
      if (removedPaths.length) {
        await auth.supabase.storage.from("project-images").remove([...new Set(removedPaths)]);
      }
      refreshProjectPages(previous?.slug);
      refreshProjectPages(input.slug);
      return NextResponse.json({ success: true });
    } catch (error) {
      if (uploadedPaths.length) {
        await auth.supabase.storage.from("project-images").remove(uploadedPaths);
      }
      throw error;
    }
  } catch (error) {
    const message =
      error instanceof ZodError
        ? error.issues[0]?.message ?? "Check the project fields."
        : error instanceof Error
          ? error.message
          : "Unable to update the project.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAdminApi(request);
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { id } = await context.params;
    const { data: project, error: loadError } = await auth.supabase
      .from("projects")
      .select("slug, cover_image_path, gallery_paths")
      .eq("id", id)
      .single();
    if (loadError || !project) throw new Error("Project not found.");

    const { error } = await auth.supabase.from("projects").delete().eq("id", id);
    if (error) throw new Error(error.message);

    const paths = [
      project.cover_image_path,
      ...((project.gallery_paths as string[] | null) ?? []),
    ].filter(Boolean);
    if (paths.length) {
      await auth.supabase.storage.from("project-images").remove(paths);
    }
    refreshProjectPages(project.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete the project." },
      { status: 400 }
    );
  }
}
