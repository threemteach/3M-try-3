"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useLanguage } from "./LanguageProvider";
import ProjectPreview from "./ProjectPreview";

export default function ProjectCard({ project }: { project: Project; index: number; active?: boolean }) {
  const { isArabic } = useLanguage();
  const href = `${isArabic ? "/ar" : ""}/projects/${project.slug}`;
  return <article className="showcase-project">
    <ProjectPreview project={project} />
    <div className="showcase-info">
      <div className="showcase-name" dir={/[\u0600-\u06ff]/.test(project.title) ? "rtl" : "ltr"}>
        <h3><Link href={href}>{project.title}</Link></h3>
        <Link href={href} aria-label={isArabic ? "تفاصيل المشروع" : "Project details"}><ArrowUpRight size={22} /></Link>
      </div>
      <p>{isArabic ? project.descriptionAr || project.description : project.description}</p>
      <div className="showcase-meta">
        {project.tags.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}
        {/^https:\/\//i.test(project.liveUrl) && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{isArabic ? "فتح الموقع" : "Visit site"} <ExternalLink size={13}/></a>}
      </div>
    </div>
  </article>;
}
