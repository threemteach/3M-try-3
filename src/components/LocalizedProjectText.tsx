"use client";

import type { Project } from "@/lib/projects";
import { useLanguage } from "@/components/LanguageProvider";

export default function LocalizedProjectText({ project }: { project: Project }) {
  const { isArabic } = useLanguage();
  return <>{isArabic ? project.descriptionAr : project.description}</>;
}
