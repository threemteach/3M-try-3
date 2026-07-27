import { z } from "zod";

export const featureSchema = z.object({
  icon: z.string().trim().max(20).default("✦"),
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(5).max(500),
});

export const projectInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  title: z.string().trim().min(2).max(120),
  category: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(500),
  longDescription: z.string().trim().min(20).max(5000),
  liveUrl: z.string().trim().url().refine((value) => /^https?:\/\//.test(value), {
    message: "Only HTTP and HTTPS links are allowed.",
  }),
  completionDate: z.string().trim().max(50).nullable(),
  client: z.string().trim().max(120).nullable(),
  displayOrder: z.coerce.number().int().min(0).max(9999),
  isPublished: z.boolean(),
  tags: z.array(z.string().trim().min(1).max(50)).min(1).max(12),
  features: z.array(featureSchema).max(12),
  existingCoverPath: z.string().max(500).nullable(),
  existingGalleryPaths: z.array(z.string().max(500)).max(20),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;

function parseJsonArray(value: FormDataEntryValue | null, field: string) {
  if (typeof value !== "string") return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) throw new Error();
    return parsed;
  } catch {
    throw new Error(`${field} contains invalid data.`);
  }
}

export function parseProjectFormData(formData: FormData): ProjectInput {
  return projectInputSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    longDescription: formData.get("longDescription"),
    liveUrl: formData.get("liveUrl"),
    completionDate: formData.get("completionDate") || null,
    client: formData.get("client") || null,
    displayOrder: formData.get("displayOrder") || 0,
    isPublished: formData.get("isPublished") === "true",
    tags: parseJsonArray(formData.get("tags"), "Tags"),
    features: parseJsonArray(formData.get("features"), "Features"),
    existingCoverPath: formData.get("existingCoverPath") || null,
    existingGalleryPaths: parseJsonArray(
      formData.get("existingGalleryPaths"),
      "Gallery"
    ),
  });
}

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);
export const MAX_IMAGE_BYTES = 6 * 1024 * 1024;

export function validateImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Images must be JPG, PNG, WebP, or AVIF.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Each image must be 6 MB or smaller.");
  }
}
