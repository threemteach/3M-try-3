"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { useLanguage } from "@/components/LanguageProvider";
import ProjectCard from "@/components/ProjectCard";

export default function Portfolio({ projects }: { projects: Project[] }) {
  const { isArabic } = useLanguage();
  const runway = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const stride = useRef(1);
  const [active, setActive] = useState(0);
  const labels = [isArabic ? "أعمالنا" : "Our Work", ...projects.map(p => p.title), isArabic ? "كل المشاريع" : "All projects"];
  const count = labels.length;

  useEffect(() => {
    const section = runway.current, row = rail.current;
    if (!section || !row) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (motion.matches || count < 2) return;
      const fraction = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / (stride.current * (count - 1))));
      const shift = fraction * (row.scrollWidth - row.clientWidth);
      row.scrollLeft = isArabic ? -shift : shift;
      setActive(Math.round(fraction * (count - 1)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      stride.current = Math.max(360, row.clientWidth * .55);
      section.style.setProperty("--project-travel", motion.matches ? "0px" : `${stride.current * Math.max(0, count - 1)}px`);
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    motion.addEventListener("change", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    measure();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); motion.removeEventListener("change", measure); };
  }, [count, isArabic]);

  function select(index: number) {
    if (!runway.current || !rail.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rail.current.children[index]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "instant" });
      setActive(index);
    } else {
      window.scrollTo({ top: window.scrollY + runway.current.getBoundingClientRect().top + stride.current * index, behavior: "smooth" });
    }
  }

  return (
    <section ref={runway} dir={isArabic ? "rtl" : "ltr"} id="portfolio" className="project-runway" aria-labelledby="home-work-title">
      <div className="project-runway-stage">
        <div ref={rail} className="project-runway-rail">
        <header className="runway-intro">
          <h2 id="home-work-title" className="text-[48px] sm:text-[60px] leading-tight [font-family:MedulaOne]">{isArabic ? "أعمالنا" : "Our Work"}</h2>
          <p>{isArabic ? "اكتشف نماذج من المنتجات التي صنعناها لعملائنا." : "Explore some of the products we've built for our clients."}</p>
        </header>
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          <div className="runway-outro">
            <h3>{isArabic ? "وراء كل مشروع قصة." : "Every project has a story."}</h3>
            <p>{isArabic ? "اكتشف الفكرة، وشاهد كيف حوّلناها إلى تجربة يستخدمها الناس." : "Discover the ideas, design decisions, and details behind the work."}</p>
            <Link href={isArabic ? "/ar/projects" : "/projects"}>{isArabic ? "اكتشف كل المشاريع" : "Explore all projects"} ↗</Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          {labels.map((label, index) => <button key={index} type="button" onClick={() => select(index)} aria-label={label} aria-current={active === index || undefined} className={`h-2 rounded-full ${active === index ? "w-8 bg-white" : "w-3 bg-[#958ba7]"}`} />)}
        </div>
      </div>
    </section>
  );
}
