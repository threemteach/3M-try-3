"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import type { Project } from "@/lib/projects";
import FeatureIcon from "@/components/FeatureIcon";

const detailHeroStars = [
  { left: "1%", top: "14%", size: 52, opacity: 0.65, rotate: -8 },
  { left: "5%", top: "25%", size: 112, opacity: 0.72, rotate: 5 },
  { left: "14%", top: "10%", size: 38, opacity: 0.58, rotate: 12 },
  { left: "18%", top: "23%", size: 62, opacity: 0.62, rotate: -10 },
  { left: "26%", top: "9%", size: 74, opacity: 0.68, rotate: 8 },
  { left: "31%", top: "19%", size: 42, opacity: 0.5, rotate: -4 },
  { left: "41%", top: "27%", size: 80, opacity: 0.62, rotate: -9 },
  { left: "48%", top: "14%", size: 42, opacity: 0.54, rotate: 8 },
  { left: "55%", top: "8%", size: 96, opacity: 0.7, rotate: -8 },
  { left: "61%", top: "24%", size: 44, opacity: 0.5, rotate: 10 },
  { left: "67%", top: "13%", size: 32, opacity: 0.45, rotate: -5 },
  { left: "72%", top: "22%", size: 92, opacity: 0.65, rotate: 7 },
  { left: "80%", top: "9%", size: 48, opacity: 0.58, rotate: -8 },
  { left: "87%", top: "19%", size: 78, opacity: 0.66, rotate: 6 },
  { left: "94%", top: "10%", size: 42, opacity: 0.52, rotate: -10 },
  { left: "3%", top: "42%", size: 45, opacity: 0.52, rotate: 8 },
  { left: "34%", top: "41%", size: 36, opacity: 0.42, rotate: -5 },
  { left: "63%", top: "39%", size: 34, opacity: 0.45, rotate: -8 },
  { left: "90%", top: "40%", size: 34, opacity: 0.46, rotate: -6 },
];

export default function ProjectDetailClient({
  project,
  locale = "en",
}: {
  project: Project;
  locale?: "en" | "ar";
}) {
  const [activeImage, setActiveImage] = useState(project.image);
  const previewImages = [
    project.image,
    ...project.gallery.filter((image) => image !== project.image),
  ];
  const technologyRows = Array.from(
    { length: Math.ceil(project.tags.length / 4) },
    (_, index) => project.tags.slice(index * 4, index * 4 + 4),
  );

  return (
    <div className="min-h-screen bg-[#EDE9E9] flex flex-col justify-between">
      {/* Project hero — one fixed composition that scales with the viewport. */}
      <header className="project-detail-hero relative overflow-hidden bg-[#302451] px-4 pt-6 text-white sm:pt-10">
        <Navbar />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {detailHeroStars.map((star, index) => (
            <Image
              key={index}
              src="/star-34.svg"
              alt=""
              width={star.size}
              height={star.size}
              className="absolute h-auto"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                opacity: star.opacity,
                transform: `rotate(${star.rotate}deg)`,
              }}
            />
          ))}
        </div>

        <div className="project-detail-stage absolute inset-0 z-10 mx-auto max-w-[1920px]">
          <div className="project-detail-character pointer-events-none absolute z-20">
            <Image
              src="/projects-hero-character.png"
              alt="3M tech character presenting the project"
              fill
              priority
              fetchPriority="high"
              sizes="30vw"
              className="object-contain object-bottom drop-shadow-[0_22px_40px_rgba(8,4,22,.2)]"
            />
          </div>

          <div className="project-detail-copy absolute z-30 text-left text-white">
            <div className="flex items-center justify-between gap-[2cqw] border-b border-white/60 pb-[.7cqw]">
              <h1 data-preserve-font="true" className="min-w-0 [font-family:MedulaOne] text-[min(6.1cqw,118px)] font-normal leading-none">
                {project.title}
              </h1>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center justify-center gap-[.55cqw] rounded-full bg-white px-[1.8cqw] py-[.8cqw] font-[Cairo] text-[min(1.45cqw,28px)] font-bold leading-none text-[#302451]"
                >
                  <span>Visit Live Project</span>
                  <svg className="h-[1.2em] w-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                </a>
              )}
            </div>

            <p className="mt-[.8cqw] max-w-[92%] font-[Cairo] text-[min(2.05cqw,39px)] font-medium leading-[1.08] text-white">
              {project.description}
            </p>

            <div className="mt-[1cqw] flex max-w-full flex-col gap-y-[.6cqw]">
              {technologyRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex justify-start gap-x-[.8cqw]"
                >
                  {row.map((tag) => (
                    <span key={tag} className="inline-flex min-w-[9.2cqw] items-center justify-center rounded-full border border-white/80 bg-[#2b2049] px-[1.25cqw] py-[.65cqw] font-[Cairo] text-[min(1.45cqw,28px)] font-bold leading-none text-white shadow-[0_.45cqw_.8cqw_rgba(12,7,28,.32)]">
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="project-detail-main relative z-20 mx-auto w-full max-w-[1920px] flex-1 px-4 pb-4 sm:pb-6">
        {/* Main project preview and overlapping gallery thumbnails. */}
        <div className="relative mx-auto mb-[clamp(70px,8vw,150px)] w-[92%] sm:w-[88%] lg:w-[60%]">
          <div className="relative aspect-[1444/1057] w-full overflow-hidden rounded-[22px] border border-[#302451]/50 bg-[#dfeaf0] shadow-[0_22px_55px_rgba(48,36,81,.18)] sm:rounded-[38px] lg:rounded-[50px]">
            <Image
              src={activeImage || project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-all duration-300"
              priority
            />
          </div>

          {previewImages.length > 1 && (
            <div
              className="absolute bottom-0 left-1/2 z-30 grid w-[82%] -translate-x-1/2 translate-y-[52%] gap-[2.2%]"
              style={{ gridTemplateColumns: `repeat(${previewImages.length}, minmax(0, 1fr))` }}
            >
              {previewImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={idx === 0 ? "Return to main project image" : `Preview project screenshot ${idx}`}
                  onClick={() => setActiveImage(img)}
                  className={`group relative aspect-[1.42/1] overflow-hidden rounded-[14px] bg-white shadow-[0_12px_25px_rgba(48,36,81,.2)] transition-all duration-300 sm:rounded-[22px] lg:rounded-[30px] ${
                    activeImage === img
                      ? "ring-2 ring-[#302451]/35 scale-[1.035]"
                      : "opacity-90 hover:scale-[1.025] hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={idx === 0 ? `${project.title} main image` : `Screenshot ${idx}`}
                    fill
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project highlights — compact two-column layout from the project design. */}
        <section className="mx-auto mb-[clamp(28px,3vw,58px)] w-[92%] max-w-[1100px] text-[#302451] sm:w-[88%] lg:w-[60%]">
          <h2
            data-preserve-font="true"
            className="project-section-title mb-[clamp(18px,2.2vw,42px)] text-center [font-family:MedulaOne] text-[clamp(34px,3.5vw,68px)] font-normal leading-none"
          >
            Project Highlights & Specifications
          </h2>

          <div className="project-feature-grid grid grid-cols-1 gap-x-[6%] gap-y-[clamp(18px,2.3vw,44px)] text-left sm:grid-cols-2">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="group relative flex min-w-0 items-start gap-[clamp(8px,1vw,18px)]"
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-[22px] w-[80%] rounded-r-[8px] bg-gradient-to-r from-[#a895ce]/45 via-[#c8bcdf]/35 to-[#e6dfec]/20 sm:left-[26px] lg:left-[clamp(17px,2vw,34px)]" />
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#302451] text-white shadow-[0_7px_16px_rgba(48,36,81,.2)] transition-transform duration-300 group-hover:scale-105 sm:h-[52px] sm:w-[52px] lg:h-[clamp(34px,4vw,68px)] lg:w-[clamp(34px,4vw,68px)]">
                  <FeatureIcon name={feat.icon} className="h-[48%] w-[48%]" />
                </span>
                <div className="relative z-10 min-w-0 pt-[.15em]">
                  <h3
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="truncate text-[15px] font-extrabold leading-none text-[#302451] sm:text-lg lg:text-[clamp(11px,1.45vw,28px)]"
                  >
                    {feat.title}
                  </h3>
                  <p
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="mt-[.35em] line-clamp-2 text-[10px] font-medium leading-[1.2] text-[#302451]/85 sm:text-xs lg:text-[clamp(8px,.72vw,14px)]"
                  >
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={locale === "ar" ? "/ar/projects" : "/projects"}
            className="mt-[clamp(24px,3vw,58px)] flex h-[clamp(38px,4.8vw,74px)] w-full items-center justify-center rounded-full bg-[#302451] px-6 font-[Cairo] text-[clamp(10px,.9vw,17px)] font-bold text-white shadow-[0_10px_24px_rgba(48,36,81,.15)] transition-colors hover:bg-[#43346d]"
          >
            Back to previous page
          </Link>
        </section>

      </main>
    </div>
  );
}
