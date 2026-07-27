import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <>
      <Link href="/admin" className="text-xs font-bold text-[#302451]/60 hover:text-[#302451]">← Back to projects</Link>
      <h1 style={{ fontFamily: '"MedulaOne", serif' }} className="mt-4 text-[54px] leading-none sm:text-[68px]">Create Project</h1>
      <p className="mt-2 text-sm text-[#625b70]">Add the content and images once; every public project surface updates from Supabase.</p>
      <ProjectForm />
    </>
  );
}
