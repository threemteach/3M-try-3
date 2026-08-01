import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProjectBySlug } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import ProjectDetailClient from "./ProjectDetailClient";
import JsonLd from "@/components/JsonLd";
import { localizedAlternates } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getPublishedProjectBySlug(id);
  if (!project) notFound();

  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;
  const title = `${project.title} Case Study`;

  return {
    title,
    description: project.description,
    keywords: [project.title, project.category, ...project.tags, "3M tech portfolio"],
    alternates: localizedAlternates(`/projects/${project.slug}`),
    openGraph: {
      title: `${title} | 3M tech`,
      description: project.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: project.image, alt: `${project.title} project by 3M tech` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 3M tech`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getPublishedProjectBySlug(id);
  if (!project) notFound();
  const projectUrl = `${SITE_URL}/projects/${project.slug}`;
  const projectJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${projectUrl}/#project`,
      name: project.title,
      description: project.longDescription || project.description,
      url: projectUrl,
      image: project.image,
      creator: { "@id": `${SITE_URL}/#organization` },
      keywords: [project.category, ...project.tags].join(", "),
      dateModified: project.updatedAt,
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${SITE_URL}/projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: projectUrl,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <ProjectDetailClient project={project} />
    </>
  );
}
