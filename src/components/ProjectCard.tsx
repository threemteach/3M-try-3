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
      className="group relative w-full overflow-hidden rounded-[28px] border border-white/80 bg-[#dfeaf0] shadow-[0_18px_45px_rgba(48,36,81,.1)] transition-transform duration-500 hover:-translate-y-1 sm:rounded-[38px] lg:rounded-[52px]"
      onMouseEnter={() => router.prefetch(projectUrl)}
      onTouchStart={() => router.prefetch(projectUrl)}
    >
      <Link
        href={projectUrl}
        prefetch
        aria-label={`View ${project.title} project`}
        className="relative block aspect-[1092/800] w-full overflow-hidden"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={index < 3}
          sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1199px) calc(100vw - 56px), 1092px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,.52)_38%,rgba(255,255,255,.85)_72%,rgba(255,255,255,.85)_100%)] backdrop-blur-[1px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 38%)",
            maskImage: "linear-gradient(to bottom, transparent, black 38%)",
          }}
        />

        <div
          dir={isArabic ? "rtl" : "ltr"}
          className={`absolute inset-x-0 bottom-0 z-[2] px-[6.5%] pb-[4.5%] text-[#302451] ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <div className="flex items-end gap-4">
            <h3
              data-preserve-font="true"
              className="min-w-0 flex-1 [font-family:MedulaOne] text-[clamp(38px,9vw,78px)] font-normal leading-[.9]"
            >
              {project.title}
            </h3>
            <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] border border-[#302451]/70 transition-colors group-hover:bg-[#302451] group-hover:text-white sm:h-9 sm:w-9">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </div>

          <span className="my-2.5 block h-px w-full bg-[#302451]/60 sm:my-4" />

          <p className={`line-clamp-2 max-w-[80%] font-[Cairo] text-[11px] font-medium leading-[1.45] text-[#302451]/90 sm:text-sm lg:text-[18px] ${isArabic ? "ml-auto" : ""}`}>
            <LocalizedProjectText project={project} />
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="truncate rounded-full bg-[#302451] px-2 py-2 text-center font-[Cairo] text-[10px] font-bold leading-none text-white shadow-[0_5px_12px_rgba(48,36,81,.2)] sm:px-5 sm:py-2.5 sm:text-sm lg:text-xl"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
