import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPageContent from "@/components/ProjectPageContent";
import { getPublishedProjectBySlug } from "@/lib/projects";
import { arabicAlternates } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getPublishedProjectBySlug(id, "ar");
  if (!project) notFound();
  return {
    title: `${project.title} | دراسة حالة مشروع رقمي`,
    description: `تعرّف على مشروع ${project.title} الذي صمّمه وطوّره فريق 3M tech، وأبرز المزايا والتقنيات المستخدمة.`,
    keywords: [project.title, "دراسة حالة مشروع", "تصميم وتطوير موقع", project.category],
    alternates: arabicAlternates(`/projects/${project.slug}`),
  };
}

export default async function ArabicProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectPageContent id={id} locale="ar" />;
}
