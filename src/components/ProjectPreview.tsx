"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

function Viewport({ mobile, url, title }: { mobile?: boolean; url: string; title: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const width = mobile ? 440 : 1440;
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const resize = () => setScale(el.clientWidth / width);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return <div className={mobile ? "device-screen phone-screen" : "device-screen desktop-screen"} ref={host}>
    {url && scale > 0 ? <iframe src={url} title={title} tabIndex={-1}
      sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer"
      style={{ width, height: mobile ? 956 : 760, transform: `scale(${scale})` }} />
      : !mobile && <span className="preview-placeholder">{title}</span>}
  </div>;
}

export default function ProjectPreview({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (entry.intersectionRatio < 0.15) return;
      // Don't start two external sites for a card the user only flicks past.
      timer = setTimeout(() => {
        setHasEntered(true);
        observer.disconnect();
      }, 220);
    }, { threshold: 0.15 });
    observer.observe(ref.current);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);
  let url = "";
  if (hasEntered && project.liveUrl) {
    try {
      const target = new URL(project.liveUrl);
      if (target.protocol === "https:" && target.origin !== location.origin) url = target.href;
    } catch { /* No embeddable address. Keep the project title visible. */ }
  }
  return <div className="project-devices" ref={ref} dir="ltr" aria-hidden="true" inert>
    <div className="desktop-shell"><div className="browser-chrome"><i /><i /><i /></div><Viewport title={project.title} url={url} /></div>
    <div className="iphone-shell"><Viewport mobile title={project.title} url={url} /><i className="dynamic-island" /></div>
  </div>;
}
