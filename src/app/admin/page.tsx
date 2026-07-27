import Image from "next/image";
import Link from "next/link";
import { getAllProjectsForAdmin } from "@/lib/projects";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export default async function AdminDashboard() {
  const projects = await getAllProjectsForAdmin();
  const published = projects.filter((project) => project.isPublished).length;
  const drafts = projects.length - published;

  return (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#302451]/50">
            Content management
          </p>
          <h1 style={{ fontFamily: '"MedulaOne", serif' }} className="mt-1 text-[54px] leading-none sm:text-[68px]">
            Projects
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#625b70]">
            Create, publish, reorder, and maintain every project shown on the website.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#302451] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(48,36,81,.22)] transition hover:-translate-y-0.5 hover:bg-[#43346d]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          New project
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-[620px] sm:gap-4">
        {[
          ["Total", projects.length],
          ["Published", published],
          ["Drafts", drafts],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm backdrop-blur-xl sm:p-5">
            <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#302451]/50">{label}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {projects.length === 0 ? (
        <div className="mt-10 rounded-[28px] border border-dashed border-[#302451]/20 bg-white/55 px-6 py-16 text-center">
          <p className="text-lg font-bold">No projects yet</p>
          <p className="mt-2 text-sm text-[#625b70]">Create the first project to populate the homepage and portfolio.</p>
          <Link href="/admin/projects/new" className="mt-6 inline-flex rounded-full bg-[#302451] px-6 py-3 text-sm font-bold text-white">
            Create a project
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="relative overflow-hidden rounded-[24px] border border-white bg-white/75 shadow-[0_16px_40px_rgba(48,36,81,.12)] backdrop-blur-xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#ded9e6]">
                {project.image && (
                  <Image src={project.image} alt={project.title} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, 33vw" />
                )}
                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold shadow-sm ${
                  project.isPublished ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-800"
                }`}>
                  {project.isPublished ? "Published" : "Draft"}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-[#302451]/85 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                  Order {project.displayOrder}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#302451]/50">{project.category}</p>
                <h2 className="mt-1 text-xl font-bold">{project.title}</h2>
                <p className="mt-2 line-clamp-2 min-h-[3em] text-xs leading-5 text-[#625b70]">{project.description}</p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#302451]/8 pt-4">
                  <span className="text-[10px] text-[#302451]/50">
                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/projects/${project.id}/edit`} className="rounded-full bg-[#302451] px-4 py-1.5 text-xs font-bold text-white">
                      Edit
                    </Link>
                    <DeleteProjectButton id={project.id} title={project.title} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
