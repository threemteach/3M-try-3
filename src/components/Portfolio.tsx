"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Project } from "@/lib/projects";

const AUTO_SWIPE_DELAY = 4500;
const LOOP_SET_COUNT = 5;
const CENTER_LOOP_SET = 2;

export default function Portfolio({ projects }: { projects: Project[] }) {
  const projectCount = projects.length;
  const initialProjectIndex = Math.min(1, Math.max(0, projectCount - 1));
  const initialPhysicalIndex =
    projectCount * CENTER_LOOP_SET + initialProjectIndex;
  const loopedProjects = useMemo(
    () =>
      Array.from({ length: LOOP_SET_COUNT }, (_, setIndex) =>
        projects.map((project, projectIndex) => ({
          project,
          projectIndex,
          loopKey: `${setIndex}-${project.id}`,
        }))
      ).flat(),
    [projects]
  );
  const [activeIndex, setActiveIndex] = useState(initialProjectIndex);
  const [activePhysicalIndex, setActivePhysicalIndex] =
    useState(initialPhysicalIndex);
  const [isAutoSwipePaused, setIsAutoSwipePaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const physicalIndexRef = useRef(initialPhysicalIndex);
  const activeIndexRef = useRef(initialProjectIndex);

  const scrollToPhysicalSlide = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const container = scrollRef.current;
    const card = container?.children[index] as HTMLElement | undefined;

    if (!container || !card) return;

    physicalIndexRef.current = index;
    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
      behavior,
    });
  }, []);

  const findClosestPhysicalIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return physicalIndexRef.current;

    const center = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(container.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const distance = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  const settleInfiniteLoop = useCallback(() => {
    if (projectCount === 0) return;
    const physicalIndex = findClosestPhysicalIndex();
    const projectIndex = physicalIndex % projectCount;
    const isNearLoopStart = physicalIndex < projectCount;
    const isNearLoopEnd = physicalIndex >= projectCount * (LOOP_SET_COUNT - 1);
    const correctedIndex =
      isNearLoopStart || isNearLoopEnd
        ? projectCount * CENTER_LOOP_SET + projectIndex
        : physicalIndex;

    if (activeIndexRef.current !== projectIndex) setActiveIndex(projectIndex);
    activeIndexRef.current = projectIndex;
    physicalIndexRef.current = correctedIndex;
    setActivePhysicalIndex((current) =>
      current === correctedIndex ? current : correctedIndex
    );
    if (correctedIndex !== physicalIndex) {
      scrollToPhysicalSlide(correctedIndex, "auto");
    }
  }, [findClosestPhysicalIndex, projectCount, scrollToPhysicalSlide]);

  const handleScroll = useCallback(() => {
    if (projectCount === 0) return;
    if (scrollFrame.current === null) {
      scrollFrame.current = window.requestAnimationFrame(() => {
        scrollFrame.current = null;
        const physicalIndex = findClosestPhysicalIndex();
        const projectIndex = physicalIndex % projectCount;
        physicalIndexRef.current = physicalIndex;
        setActivePhysicalIndex((current) =>
          current === physicalIndex ? current : physicalIndex
        );
        if (activeIndexRef.current !== projectIndex) {
          activeIndexRef.current = projectIndex;
          setActiveIndex(projectIndex);
        }
      });
    }

    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = setTimeout(settleInfiniteLoop, 180);
  }, [findClosestPhysicalIndex, projectCount, settleInfiniteLoop]);

  const scrollToProject = useCallback((projectIndex: number) => {
    const currentPhysical = physicalIndexRef.current;
    const candidates = Array.from(
      { length: LOOP_SET_COUNT },
      (_, setIndex) => projectIndex + projectCount * setIndex
    );
    const closest = candidates.reduce((best, candidate) =>
      Math.abs(candidate - currentPhysical) < Math.abs(best - currentPhysical)
        ? candidate
        : best
    );

    setActiveIndex(projectIndex);
    activeIndexRef.current = projectIndex;
    setActivePhysicalIndex(closest);
    scrollToPhysicalSlide(closest);
  }, [projectCount, scrollToPhysicalSlide]);

  const pauseAfterInteraction = useCallback(() => {
    setIsAutoSwipePaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsAutoSwipePaused(false), 7000);
  }, []);

  useEffect(() => {
    if (projectCount === 0) return;
    const timer = window.setTimeout(
      () => scrollToPhysicalSlide(initialPhysicalIndex, "auto"),
      50
    );
    const handleResize = () => {
      const centeredLoopIndex =
        projectCount * CENTER_LOOP_SET + activeIndexRef.current;
      physicalIndexRef.current = centeredLoopIndex;
      setActivePhysicalIndex(centeredLoopIndex);
      scrollToPhysicalSlide(centeredLoopIndex, "auto");
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(timer);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [initialPhysicalIndex, projectCount, scrollToPhysicalSlide]);

  useEffect(() => {
    if (
      projectCount === 0 ||
      isAutoSwipePaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const autoSwipeTimer = window.setInterval(() => {
      if (document.hidden) return;
      const nextPhysicalIndex = physicalIndexRef.current + 1;
      physicalIndexRef.current = nextPhysicalIndex;
      setActivePhysicalIndex(nextPhysicalIndex);
      activeIndexRef.current = nextPhysicalIndex % projectCount;
      setActiveIndex(activeIndexRef.current);
      scrollToPhysicalSlide(nextPhysicalIndex);
    }, AUTO_SWIPE_DELAY);

    return () => window.clearInterval(autoSwipeTimer);
  }, [isAutoSwipePaused, projectCount, scrollToPhysicalSlide]);

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden bg-[#f3f0f3] px-0 py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,#cbc5ce_0%,rgba(216,211,219,.72)_38%,rgba(243,240,243,0)_100%)] sm:h-20 lg:h-24"
      />

      <div className="relative mx-auto max-w-[1440px] text-center">
        <div className="mb-3 flex items-center justify-center gap-4 px-5 sm:gap-6">
          <span className="h-[2px] w-12 bg-[#302451] sm:w-20 lg:w-24" />
          <h2
            style={{ fontFamily: '"MedulaOne", serif' }}
            className="text-[52px] font-normal leading-none text-[#302451] sm:text-[68px] lg:text-[76px]"
          >
            Our Work
          </h2>
          <span className="h-[2px] w-12 bg-[#302451] sm:w-20 lg:w-24" />
        </div>

        <p
          style={{ fontFamily: '"Cairo", sans-serif' }}
          className="mx-auto mb-9 max-w-[760px] px-5 text-[15px] font-semibold text-[#302451] sm:mb-12 sm:text-xl"
        >
          Explore some of the products we&apos;ve built for our clients.
        </p>

        <div className="relative mx-auto max-w-[1320px]">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsAutoSwipePaused(true)}
            onMouseLeave={() => setIsAutoSwipePaused(false)}
            onFocusCapture={() => setIsAutoSwipePaused(true)}
            onBlurCapture={() => setIsAutoSwipePaused(false)}
            onPointerDown={pauseAfterInteraction}
            className="flex touch-pan-x snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth px-[11vw] py-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 sm:px-[20vw] lg:gap-8 lg:px-[5%]"
          >
            {loopedProjects.map(({ project, projectIndex, loopKey }, physicalIndex) => {
              const isActive = physicalIndex === activePhysicalIndex;
              const isBefore = physicalIndex < activePhysicalIndex;
              const isNearActive =
                Math.abs(physicalIndex - activePhysicalIndex) <= 1;

              return (
                <article
                  key={loopKey}
                  className={`relative aspect-[590/799] w-[78vw] max-w-[440px] shrink-0 snap-center [scroll-snap-stop:always] overflow-hidden rounded-[22px] border border-white/90 shadow-[0_18px_45px_rgba(48,36,81,.14)] transition-transform duration-500 ease-out sm:w-[60vw] lg:w-[35%] lg:max-w-[480px] ${
                    isActive ? "z-10 scale-100" : "z-0 lg:scale-[.975]"
                  }`}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={() => setActiveIndex(projectIndex)}
                    aria-label={`View ${project.title} project`}
                    className="group absolute inset-0 block overflow-hidden rounded-[inherit] bg-white/35"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={physicalIndex === initialPhysicalIndex}
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      style={{ objectPosition: "58% top" }}
                      sizes="(max-width: 639px) 78vw, (max-width: 1023px) 60vw, 35vw"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-white/15"
                    />

                    <div className="project-card-category absolute inset-x-0 top-0 z-[2] flex justify-start px-4 pt-4 sm:px-5 sm:pt-5">
                      <span
                        style={{ fontFamily: '"Cairo", sans-serif' }}
                        className={`max-w-full truncate rounded-full border border-white/85 bg-white/78 px-4 py-2 text-[9px] font-bold uppercase tracking-[.09em] text-[#302451] shadow-[0_8px_24px_rgba(48,36,81,.16),inset_0_1px_0_rgba(255,255,255,.95)] sm:px-5 sm:text-[10px] ${
                          isNearActive ? "backdrop-blur-md" : ""
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>

                    <div className="project-card-copy absolute inset-x-0 bottom-0 flex min-h-[39%] flex-col justify-end px-5 pb-5 pt-20 text-left sm:px-6 sm:pb-6">
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 border-t border-white/30 bg-gradient-to-b from-white/0 via-white/82 to-white/95 ${
                          isNearActive ? "backdrop-blur-[2px]" : ""
                        }`}
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
                            className="min-w-0 flex-1 text-[38px] font-normal leading-[.95] text-[#302451] sm:text-[46px] lg:text-[clamp(34px,3vw,52px)]"
                          >
                            {project.title}
                          </h3>
                          <span className="mb-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] border border-[#302451]/65 text-[#302451] transition-colors group-hover:bg-[#302451] group-hover:text-white">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                          </span>
                        </div>

                        <span className="my-2 block h-px w-full bg-gradient-to-r from-[#302451]/60 to-transparent" />

                        <p
                          style={{ fontFamily: '"Cairo", sans-serif' }}
                          className="line-clamp-2 min-h-[2.9em] text-[10px] font-medium leading-[1.45] text-[#504961] sm:text-[11px] lg:text-[clamp(9px,.82vw,12px)]"
                        >
                          {project.description}
                        </p>

                        <div className="mt-3 flex items-center justify-center gap-2 overflow-hidden sm:mt-4 sm:gap-2.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              style={{ fontFamily: '"Cairo", sans-serif' }}
                              className="shrink-0 whitespace-nowrap rounded-full bg-[#302451] px-3.5 py-1.5 text-[10px] font-bold leading-none text-white shadow-[0_3px_10px_rgba(48,36,81,.25)] sm:px-4 sm:py-2 sm:text-[12px] lg:text-[clamp(10px,.78vw,12px)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {!isActive && (
                      <div
                        aria-hidden="true"
                        data-side-card-fade
                        className={`pointer-events-none absolute inset-0 hidden lg:block ${
                          isBefore
                            ? "bg-[linear-gradient(to_right,rgba(255,255,255,.72)_0%,rgba(255,255,255,.32)_32%,rgba(255,255,255,.08)_58%,transparent_90%)]"
                            : "bg-[linear-gradient(to_left,rgba(255,255,255,.72)_0%,rgba(255,255,255,.32)_32%,rgba(255,255,255,.08)_58%,transparent_90%)]"
                        }`}
                      />
                    )}
                  </Link>
                </article>
              );
            })}
            {projects.length === 0 && (
              <div className="mx-auto flex min-h-72 w-full items-center justify-center rounded-[28px] border border-dashed border-[#302451]/15 bg-white/40 px-6 text-sm font-semibold text-[#302451]/55">
                New projects are coming soon.
              </div>
            )}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-[#f3f0f3]/70 to-transparent sm:w-[12%] lg:w-[5%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-[#f3f0f3]/70 to-transparent sm:w-[12%] lg:w-[5%]"
          />
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 sm:mt-7">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => {
                pauseAfterInteraction();
                scrollToProject(index);
              }}
              aria-label={`Show ${project.title}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-10 bg-[#302451]"
                  : "w-5 bg-[#302451]/45 hover:bg-[#302451]/65"
              }`}
            />
          ))}
        </div>

        <div className="mt-9 flex justify-center px-5 sm:mt-11">
          <Link
            href="/projects"
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="group flex h-12 items-center justify-center gap-3 rounded-full border border-white/30 bg-[#302451] px-8 text-sm font-bold text-white shadow-[0_12px_30px_rgba(48,36,81,.22)] transition-all hover:-translate-y-0.5 hover:bg-[#43346d] sm:h-14 sm:text-base"
          >
            <span>See All Projects</span>
            <span className="transition-transform group-hover:translate-x-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
