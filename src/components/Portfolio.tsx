"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import type { Project } from "@/lib/projects";
import { useLanguage } from "@/components/LanguageProvider";
import ProjectCard from "@/components/ProjectCard";

export default function Portfolio({ projects }: { projects: Project[] }) {
  const { isArabic } = useLanguage();
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const dragged = useRef(false);
  const [active, setActive] = useState(0);
  const labels = [isArabic ? "أعمالنا" : "Our Work", ...projects.map(p => p.title), isArabic ? "كل المشاريع" : "All projects"];
  function centerOffset(row: HTMLElement, item: Element) {
    const bounds = item.getBoundingClientRect();
    return bounds.left + bounds.width / 2 - row.getBoundingClientRect().left - row.clientWidth / 2;
  }

  function syncActive() {
    const row = rail.current;
    if (!row) return;
    const distances = Array.from(row.children, item => Math.abs(centerOffset(row, item)));
    setActive(distances.indexOf(Math.min(...distances)));
  }

  function select(index: number) {
    const row = rail.current;
    if (row) row.scrollBy({ left: centerOffset(row, row.children[index]), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || event.pointerType !== "mouse" || event.buttons !== 1) return;
    const delta = event.clientX - drag.current.x;
    if (!dragged.current && Math.abs(delta) < 6) return;
    const row = event.currentTarget;
    if (!dragged.current) {
      row.setPointerCapture(event.pointerId);
      row.dataset.dragging = "true";
      dragged.current = true;
    }
    row.scrollLeft = drag.current.left - delta;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
  }

  return (
    <section dir={isArabic ? "rtl" : "ltr"} id="portfolio" className="project-runway" aria-labelledby="home-work-title">
      <div className="project-runway-stage">
        <div ref={rail} className="project-runway-rail" onScroll={syncActive}
          onPointerDown={event => {
            dragged.current = false;
            drag.current = event.pointerType === "mouse" && event.button === 0 ? { x: event.clientX, left: event.currentTarget.scrollLeft } : null;
          }}
          onPointerMove={move} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
          onDragStart={event => event.preventDefault()}
          onClickCapture={event => { if (dragged.current && event.detail) { event.preventDefault(); event.stopPropagation(); } }}>
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
