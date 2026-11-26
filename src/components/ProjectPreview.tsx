"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

const screenshots: Record<string, string> = {
  "https://www.setup-studios.com": "setup-studio",
  "https://mo3tazv1.vercel.app": "mo3taz-portfolio",
  "https://royal-ccrs.vercel.app": "royal-cars",
  "https://rent-go.ae": "rent-and-go",
  "https://www.curacareclinic.com": "cura-care",
};

function Viewport({ mobile, project, started }: { mobile?: boolean; project: Project; started: boolean }) {
  const slug = screenshots[project.liveUrl?.replace(/\/+$/, "")];
  const base = `/project-previews/${slug}-${mobile ? "mobile" : "desktop"}`;
  return <div className={mobile ? "device-screen phone-screen" : "device-screen desktop-screen"}>
    {slug ? <picture>
      {started && <source media="(prefers-reduced-motion: no-preference)" srcSet={base + "-intro.webp"} />}
      <img className="preview-poster" src={base + ".webp"} loading="lazy" alt="" />
    </picture> : !mobile && <span className="preview-placeholder">{project.title}</span>}
  </div>;
}

export default function ProjectPreview({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div className="project-devices" ref={ref} dir="ltr" aria-hidden="true">
    <div className="desktop-shell"><div className="browser-chrome"><i /><i /><i /></div><Viewport project={project} started={started} /></div>
    <div className="iphone-shell"><Viewport mobile project={project} started={started} /><i className="dynamic-island" /></div>
  </div>;
}
