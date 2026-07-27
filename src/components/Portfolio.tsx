"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { projectsData } from "@/lib/projectsData";

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to middle card
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.78;
    if (cardWidth > 0) {
      const newIndex = Math.min(
        Math.max(0, Math.round(scrollPosition / cardWidth)),
        projectsData.length - 1
      );
      setActiveIndex(newIndex);
    }
  }, []);

  const scrollToSlide = (index: number) => {
    setActiveIndex(index);
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[index] as HTMLElement | undefined;
    if (card) {
      const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      container.scrollTo({
        left,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeIndex - 1);
    scrollToSlide(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(projectsData.length - 1, activeIndex + 1);
    scrollToSlide(nextIndex);
  };

  // Scroll to middle card by default on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToSlide(1);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <section className="relative w-full bg-[#f5f2f3] py-16 sm:py-20 lg:py-24 px-4 overflow-hidden" id="portfolio">
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
          className="mx-auto mb-3 max-w-[800px] px-2 text-[16px] font-semibold text-[#302451] sm:text-[20px] md:text-[24px] lg:text-[26px]"
        >
          Explore some of the products we&apos;ve built for our clients.
        </p>
        <p className="mx-auto mb-10 max-w-[760px] rounded-full border border-[#302451]/10 bg-white/55 px-5 py-3 text-[11px] font-semibold leading-5 text-[#302451]/75 shadow-sm sm:mb-14 sm:px-7 sm:text-sm sm:leading-6">
          No random AI design directions—every product decision is intentional,
          researched, and connected to the client&apos;s business.
        </p>

        {/* Carousel Container with Scroll Arrow Buttons */}
        <div className="relative max-w-[1150px] mx-auto px-2 sm:px-6">
          {/* Left Scroll Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#302451] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#43346d] active:scale-95 disabled:opacity-30 disabled:pointer-events-none lg:hidden"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Scroll Arrow Button */}
          <button
            onClick={handleNext}
            disabled={activeIndex === projectsData.length - 1}
            aria-label="Next project"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#302451] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#43346d] active:scale-95 disabled:opacity-30 disabled:pointer-events-none lg:hidden"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Carousel (Horizontal Scroll for Mobile/Tablet, Grid for Desktop) */}
          <div
            ref={scrollRef}
            className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10 max-w-[1150px] mx-auto overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none py-4 px-2 -mx-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projectsData.map((project, idx) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                onClick={() => setActiveIndex(idx)}
                className="group relative flex flex-col shrink-0 w-[82vw] sm:w-[50vw] md:w-[42vw] lg:w-auto snap-center bg-white/90 backdrop-blur-sm rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/60 text-left"
              >
                {/* Preview Image Container */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#ded9e6] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#302451]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold bg-[#302451]/90 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                      View Project Details ↗
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white/80">
                  <div>
                    <h3
                      style={{ fontFamily: '"Cairo", sans-serif' }}
                      className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-[#302451] mb-2 leading-tight flex items-center justify-between"
                    >
                      <span>{project.title}</span>
                      <span className="text-xs font-semibold text-[#302451] bg-purple-100 px-3 py-1 rounded-full group-hover:bg-[#302451] group-hover:text-white transition-colors duration-200">
                        View ↗
                      </span>
                    </h3>
                    <p
                      style={{ fontFamily: '"Cairo", sans-serif' }}
                      className="text-[12px] sm:text-[13px] text-gray-600 leading-relaxed mb-4 line-clamp-3"
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{ fontFamily: '"Cairo", sans-serif' }}
                        className="px-3 py-1 rounded-full bg-[#302451] text-white text-[10px] sm:text-[11px] font-semibold whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Animated Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-3 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-8 sm:w-10 bg-[#302451] shadow-sm"
                  : "w-3 bg-[#a299b8] hover:bg-[#5E5376]"
              }`}
            />
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
