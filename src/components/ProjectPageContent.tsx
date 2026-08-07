import { notFound } from "next/navigation";
import { getPublishedProjectBySlug } from "@/lib/projects";
import { SITE_URL } from "@/lib/constants";
import ProjectDetailClient from "@/app/projects/[id]/ProjectDetailClient";
import JsonLd from "@/components/JsonLd";

export default async function ProjectPageContent({ id, locale = "en" }: { id: string; locale?: "en" | "ar" }) {
  const project = await getPublishedProjectBySlug(id, locale);
  if (!project) notFound();
  const prefix = locale === "ar" ? "/ar" : "";
  const projectUrl = `${SITE_URL}${prefix}/projects/${project.slug}`;
  const projectJsonLd = [
    {
      "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${projectUrl}/#project`,
      name: project.title, description: project.longDescription || project.description, url: projectUrl,
      image: project.image, creator: { "@id": `${SITE_URL}/#organization` },
      keywords: [project.category, ...project.tags].join(", "), dateModified: project.updatedAt, inLanguage: locale,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: locale === "ar" ? "الرئيسية" : "Home", item: `${SITE_URL}${prefix}` },
        { "@type": "ListItem", position: 2, name: locale === "ar" ? "المشاريع" : "Projects", item: `${SITE_URL}${prefix}/projects` },
        { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
      ],
    },
  ];
  return <><JsonLd data={projectJsonLd} /><ProjectDetailClient project={project} locale={locale} /></>;
}
