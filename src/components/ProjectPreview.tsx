"use client";

import { useLanguage } from "./LanguageProvider";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

function externalOrigin(url: string) {
  try {
    const origin = new URL(url).origin;
    return origin.startsWith("https://") && origin !== window.location.origin;
  } catch {
    return false;
  }
}

function Viewport({ mobile, project, url }: { mobile?: boolean; project: Project; url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const { isArabic } = useLanguage();
  const viewport = mobile ? 440 : 1440;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setScale(el.clientWidth / viewport);
    const observer = new ResizeObserver(() => setScale(el.clientWidth / viewport));
    observer.observe(el);
    return () => observer.disconnect();
  }, [viewport]);
  return <div ref={ref} className={mobile ? "device-screen phone-screen" : "device-screen desktop-screen"}>
    {!mobile && <span className="preview-placeholder">{/^https:\/\//i.test(project.liveUrl)
      ? (isArabic ? "جارٍ تحميل الموقع…" : "Loading website…")
      : (isArabic ? "المعاينة غير متاحة" : "Preview unavailable")}</span>}
    {url && scale > 0 && <iframe title={project.title + (mobile ? " mobile preview" : " desktop preview")} src={url}
      sandbox={externalOrigin(url) ? "allow-scripts allow-same-origin" : "allow-scripts"}
      tabIndex={-1} referrerPolicy="no-referrer" style={{width: viewport, height: mobile ? 956 : 900, transform: `scale(${scale})`}} />}
  </div>;
}

export default function ProjectPreview({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rail = el.closest(".project-runway-rail");
    let nearby: IntersectionObserver | undefined;
    const start = () => { setVisible(true); nearby?.disconnect(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!rail) { start(); return; }
      // Preload the neighbouring cards inside the clipped rail.
      nearby = new IntersectionObserver(([card]) => { if (card.isIntersecting) start(); },
        { root: rail, rootMargin: "0px 100%" });
      nearby.observe(el);
    }, { rootMargin: "900px 0px" });
    observer.observe(rail ?? el);
    return () => { observer.disconnect(); nearby?.disconnect(); };
  }, []);
  const url = visible && /^https:\/\//i.test(project.liveUrl) ? project.liveUrl : "";
  return <div ref={ref} className="project-devices" dir="ltr" aria-hidden="true" inert>
    <div className="desktop-shell"><div className="browser-chrome"><i /><i /><i /></div><Viewport project={project} url={url} /></div>
    <div className="iphone-shell"><Viewport mobile project={project} url={url} /><i className="dynamic-island" /></div>
  </div>;
}
