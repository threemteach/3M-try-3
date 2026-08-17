"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";
import { useLanguage } from "@/components/LanguageProvider";
import LocalizedProjectText from "@/components/LocalizedProjectText";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { isArabic } = useLanguage();
  const router = useRouter();
  const projectUrl = isArabic ? `/ar/projects/${project.slug}` : `/projects/${project.slug}`;

  return (
    <article
      className="group relative mx-auto aspect-[590/799] w-full max-w-[480px] cursor-pointer overflow-hidden rounded-[24px] border border-white/90 bg-white/30 shadow-[0_22px_55px_rgba(48,36,81,.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(48,36,81,.27)]"
      onMouseEnter={() => router.prefetch(projectUrl)}
      onTouchStart={() => router.prefetch(projectUrl)}
    >
      <Link
        href={projectUrl}
        prefetch={true}
        aria-label={`View ${project.title} project`}
        className="absolute inset-0 z-10 block cursor-pointer overflow-hidden rounded-[inherit]"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={index < 3}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          style={{ objectPosition: "58% top" }}
          sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 48vw, 31vw"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/15"
        />

        <div className="project-card-category pointer-events-none absolute inset-x-0 top-0 z-[2] flex justify-start px-4 pt-4 sm:px-5 sm:pt-5">
          <span
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="max-w-full truncate rounded-full border border-white/85 bg-white/78 px-4 py-2 text-[9px] font-bold uppercase tracking-[.09em] text-[#302451] shadow-[0_8px_24px_rgba(48,36,81,.16),inset_0_1px_0_rgba(255,255,255,.95)] sm:px-5 sm:text-[10px] backdrop-blur-md"
          >
            {project.category}
          </span>
        </div>

        <div className="project-card-copy pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[40%] flex-col justify-end px-5 pb-5 pt-20 text-left sm:px-6 sm:pb-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 border-t border-white/35 bg-gradient-to-b from-white/0 via-white/82 to-white/95 backdrop-blur-[2px]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.2) 15%, black 42%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.2) 15%, black 42%)",
            }}
          />

          <div className="relative">
            <div className="flex items-end gap-3">
              <h3
                style={{ fontFamily: '"MedulaOne", serif' }}
                data-preserve-font="true"
                className="min-w-0 flex-1 text-[42px] font-normal leading-[.95] text-[#302451] sm:text-[48px] lg:text-[clamp(38px,3.4vw,52px)]"
              >
                {project.title}
              </h3>
              <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] border border-[#302451]/60 text-[#302451] transition-colors group-hover:bg-[#302451] group-hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
              </span>
            </div>

            <span className="my-2.5 block h-px w-full bg-gradient-to-r from-[#302451]/60 to-transparent" />

            <p
              style={{ fontFamily: '"Cairo", sans-serif' }}
              className="line-clamp-2 min-h-[2.9em] text-[10px] font-medium leading-[1.45] text-[#504961] sm:text-[11px] lg:text-[clamp(10px,.78vw,12px)]"
            >
              <LocalizedProjectText project={project} />
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 overflow-hidden">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} style={{ fontFamily: '"Cairo", sans-serif' }} className="shrink-0 whitespace-nowrap rounded-full bg-[#302451] px-3.5 py-1.5 text-[10px] font-bold leading-none text-white shadow-[0_3px_10px_rgba(48,36,81,.25)] sm:px-4 sm:py-2 sm:text-[11px]">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
