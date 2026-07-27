import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData } from "@/lib/projectsData";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((item) => item.id === id);

  if (!project) notFound();

  const canonicalUrl = `${SITE_URL}/projects/${project.id}`;
  const title = `${project.title} Case Study`;

  return {
    title,
    description: project.description,
    keywords: [project.title, project.category, ...project.tags, "3M tech portfolio"],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${title} | 3M tech`,
      description: project.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "article",
      images: [
        {
          url: project.image,
          alt: `${project.title} project by 3M tech`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 3M tech`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ProjectDetailClient params={params} />;
}
