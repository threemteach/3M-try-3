"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProjectsHeroContent() {
  const { isArabic } = useLanguage();

  return (
    <>
      {isArabic ? (
        <h1 className="projects-hero-title projects-hero-title-ar absolute left-0 z-10 h-[1em] w-full [font-family:Sahlab] font-normal leading-[0.78] text-white" dir="rtl">
          <span className="sr-only">مشاريعنا</span>
          <span aria-hidden="true" className="relative block h-full w-full whitespace-nowrap">
            <span className="projects-hero-title-ar-word absolute top-0">مشاريــــــــــــــــــــــــــــــــعنا</span>
          </span>
        </h1>
      ) : (
        <h1 className="projects-hero-title absolute left-0 z-10 h-[1em] w-full [font-family:MedulaOne] font-normal leading-[0.78] text-white">
          <span className="sr-only">Our Projects</span>
          <span aria-hidden="true" className="relative block h-full w-full whitespace-nowrap">
            <span className="projects-hero-title-start absolute left-[12.1%] top-0">Our Pr</span>
            <span className="projects-hero-capsule absolute left-[52.1%] top-0 inline-block -translate-x-1/2 rounded-full" />
            <span className="projects-hero-title-end absolute top-0">jects</span>
          </span>
        </h1>
      )}

      <div
        aria-hidden="true"
        dir={isArabic ? "rtl" : "ltr"}
        className={`projects-hero-tagline absolute z-[12] w-auto leading-[0.92] ${
          isArabic
            ? "projects-hero-tagline-ar text-right [font-family:Sahlab]"
            : "left-[12.1%] text-left [font-family:MedulaOne]"
        }`}
      >
        {[1, 0.72, 0.48, 0.28, 0.14].map((opacity, index) => (
          <p key={index} className="whitespace-nowrap" style={{ opacity }}>
            {isArabic ? "نحن نصنع حلمك" : "We make your Dream"}
          </p>
        ))}
      </div>

      <div className="projects-hero-character pointer-events-none absolute left-[52.1%] z-20 -translate-x-1/2">
        <Image
          src="/projects-hero-character.png"
          alt={isArabic ? "شخصية 3M tech تقدم مشاريعنا" : "3M tech character presenting our projects"}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 639px) 315px, (max-width: 1023px) 400px, (max-width: 1279px) 468px, 512px"
          className="object-contain object-bottom drop-shadow-[0_22px_40px_rgba(8,4,22,.2)]"
        />
      </div>
    </>
  );
}
