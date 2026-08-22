"use client";

import { useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

const PROJECTS_PER_PAGE = 3;

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const pageCount = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const visibleProjects = projects.slice(
    (page - 1) * PROJECTS_PER_PAGE,
    page * PROJECTS_PER_PAGE,
  );

  const selectPage = (nextPage: number) => {
    setPage(nextPage);
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <div ref={gridRef} className="grid scroll-mt-6 grid-cols-1 gap-4 sm:gap-5 lg:gap-8">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={(page - 1) * PROJECTS_PER_PAGE + index}
          />
        ))}
      </div>

      {pageCount > 1 && (
        <nav aria-label="Projects pagination" className="mt-7 flex justify-center gap-3 sm:mt-10">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-label={`Show projects page ${pageNumber}`}
              aria-current={page === pageNumber ? "page" : undefined}
              onClick={() => selectPage(pageNumber)}
              className={`flex h-7 min-w-7 items-center justify-center rounded-[5px] px-1 font-[Cairo] text-sm font-bold transition-colors ${
                page === pageNumber
                  ? "border border-[#302451]/35 bg-white text-[#302451] shadow-sm"
                  : "text-[#302451]/75 hover:bg-white/60 hover:text-[#302451]"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
