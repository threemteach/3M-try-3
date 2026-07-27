import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <>
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#302451]/60 hover:text-[#302451]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> Back to projects</Link>
      <h1 style={{ fontFamily: '"MedulaOne", serif' }} className="mt-4 text-[54px] leading-none sm:text-[68px]">Create Project</h1>
      <p className="mt-2 text-sm text-[#625b70]">Add the content and images once; every public project surface updates from Supabase.</p>
      <ProjectForm />
    </>
  );
}
