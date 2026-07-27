import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectForAdmin } from "@/lib/projects";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectForAdmin(id);
  if (!project) notFound();

  return (
    <>
      <Link href="/admin" className="text-xs font-bold text-[#302451]/60 hover:text-[#302451]">← Back to projects</Link>
      <h1 style={{ fontFamily: '"MedulaOne", serif' }} className="mt-4 text-[54px] leading-none sm:text-[68px]">Edit Project</h1>
      <p className="mt-2 text-sm text-[#625b70]">Update content, images, visibility, and display order.</p>
      <ProjectForm project={project} />
    </>
  );
}
