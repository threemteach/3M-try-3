import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type ProjectFeature = {
  icon: string;
  title: string;
  description: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  coverImagePath: string;
  image: string;
  galleryPaths: string[];
  gallery: string[];
  tags: string[];
  features: ProjectFeature[];
  liveUrl: string;
  completionDate: string | null;
  client: string | null;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  long_description: string;
  cover_image_path: string;
  gallery_paths: string[];
  tags: string[];
  features: ProjectFeature[];
  live_url: string;
  completion_date: string | null;
  client: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

const PROJECT_IMAGE_BUCKET = "project-images";

function getPublicImageUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl || !path) return "";
  return `${baseUrl}/storage/v1/object/public/${PROJECT_IMAGE_BUCKET}/${path}`;
}

export function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    description: row.description,
    longDescription: row.long_description,
    coverImagePath: row.cover_image_path,
    image: getPublicImageUrl(row.cover_image_path),
    galleryPaths: row.gallery_paths ?? [],
    gallery: (row.gallery_paths ?? []).map(getPublicImageUrl),
    tags: row.tags ?? [],
    features: row.features ?? [],
    liveUrl: row.live_url,
    completionDate: row.completion_date,
    client: row.client,
    displayOrder: row.display_order,
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const getPublishedProjects = cache(async (): Promise<Project[]> => {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Unable to load projects: ${error.message}`);
  return (data as ProjectRow[]).map(mapProject);
});

export const getPublishedProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    if (!isSupabaseConfigured()) return null;
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) throw new Error(`Unable to load project: ${error.message}`);
    return data ? mapProject(data as ProjectRow) : null;
  }
);

export async function getAllProjectsForAdmin(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Unable to load admin projects: ${error.message}`);
  return (data as ProjectRow[]).map(mapProject);
}

export async function getProjectForAdmin(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Unable to load admin project: ${error.message}`);
  return data ? mapProject(data as ProjectRow) : null;
}
