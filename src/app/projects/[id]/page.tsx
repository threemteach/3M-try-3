import { projectsData } from "@/lib/projectsData";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: project.id }));
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ProjectDetailClient params={params} />;
}
