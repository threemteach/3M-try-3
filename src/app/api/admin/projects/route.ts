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

function safeExtension(file: File) {
  const byType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
  };
  return byType[file.type] ?? "bin";
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

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const formData = await request.formData();
    const input = parseProjectFormData(formData);
    const coverFile = formData.get("coverImage");
    if (!(coverFile instanceof File) || coverFile.size === 0) {
      return NextResponse.json({ error: "A cover image is required." }, { status: 400 });
    }

    const folder = `${input.slug}-${randomUUID()}`;
    const uploadedPaths: string[] = [];

    try {
      const coverPath = await uploadImage(auth.supabase, coverFile, folder);
      uploadedPaths.push(coverPath);

      const galleryFiles = formData
        .getAll("galleryImages")
        .filter((item): item is File => item instanceof File && item.size > 0);
      if (galleryFiles.length > 12) {
        throw new Error("Upload no more than 12 gallery images.");
      }

      const galleryPaths: string[] = [];
      for (const file of galleryFiles) {
        const path = await uploadImage(auth.supabase, file, folder);
        uploadedPaths.push(path);
        galleryPaths.push(path);
      }

      const { data, error } = await auth.supabase
        .from("projects")
        .insert({
          slug: input.slug,
          title: input.title,
          category: input.category,
          description: input.description,
          long_description: input.longDescription,
          cover_image_path: coverPath,
          gallery_paths: galleryPaths,
          tags: input.tags,
          features: input.features,
          live_url: input.liveUrl,
          completion_date: input.completionDate,
          client: input.client,
          display_order: input.displayOrder,
          is_published: input.isPublished,
        })
        .select("id, slug")
        .single();

      if (error) throw new Error(error.message);
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath("/sitemap.xml");
      return NextResponse.json({ project: data }, { status: 201 });
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
          : "Unable to create the project.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
