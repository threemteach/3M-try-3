"use client";

import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/lib/projectsData";

export default function Portfolio() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#f9f7fc] via-[#f3eef8] to-[#e8e2f0] py-16 sm:py-20 lg:py-24 px-4 overflow-hidden" id="portfolio">
      <div className="max-w-[1280px] mx-auto text-center">
        {/* Section Title with Decorative Accent Lines */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
          <div className="w-12 sm:w-20 lg:w-28 h-[3px] bg-[#5E5376] rounded-full opacity-80" />
          <h2
            style={{ fontFamily: '"MedulaOne", serif' }}
            className="text-[52px] sm:text-[68px] md:text-[80px] lg:text-[90px] font-normal leading-none text-[#302451]"
          >
            Our Work
          </h2>
          <div className="w-12 sm:w-20 lg:w-28 h-[3px] bg-[#5E5376] rounded-full opacity-80" />
        </div>

        {/* Subtitle */}
        <p
          style={{ fontFamily: '"Cairo", sans-serif' }}
          className="text-[16px] sm:text-[20px] md:text-[24px] lg:text-[26px] font-semibold text-[#302451] max-w-[800px] mx-auto mb-10 sm:mb-14 px-2"
        >
          Explore some of the products we&apos;ve built for our clients.
        </p>

        {/* Cards Grid - Always 3 columns, scaled proportionally */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-[1150px] mx-auto">
          {projectsData.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group relative flex flex-col bg-white/90 backdrop-blur-sm rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/60 text-left"
              style={{ height: "clamp(240px, 38vw, 380px)" }}
            >
              {/* Preview Image Container */}
              <div className="relative w-full overflow-hidden" style={{ height: "58%" }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#302451]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-semibold bg-[#302451]/90 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                    View Project Details ↗
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 justify-between p-3 sm:p-4 lg:p-5 bg-white/80">
                <div>
                  <h3
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="text-[clamp(13px,2.2vw,22px)] font-bold text-[#302451] mb-1 leading-tight flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <span className="text-[clamp(8px,1.1vw,12px)] font-semibold text-[#302451] bg-purple-100 px-2 py-0.5 rounded-full group-hover:bg-[#302451] group-hover:text-white transition-colors duration-200 shrink-0">
                      View ↗
                    </span>
                  </h3>
                  <p
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="text-[clamp(9px,1.4vw,13px)] text-gray-600 leading-relaxed line-clamp-2"
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{ fontFamily: '"Cairo", sans-serif' }}
                      className="px-2 py-0.5 rounded-full bg-[#302451] text-white text-[clamp(7px,1vw,11px)] font-semibold whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SEE ALL PROJECTS BUTTON */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/projects"
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="group flex h-12 sm:h-14 px-8 items-center justify-center gap-3 rounded-full bg-[#302451] text-white text-14px sm:text-16px font-bold shadow-xl transition-all duration-300 hover:bg-[#43346d] hover:scale-105 hover:shadow-2xl active:scale-95 border border-white/20"
          >
            <span>See All Projects</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
