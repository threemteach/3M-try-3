"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function LogoWorkReveal({ children }: { children: ReactNode }) {
  const { isArabic } = useLanguage();
  const section = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = section.current;
    const canvasHost = host.current;
    if (!element || !canvasHost) return;
    const controller = new AbortController();
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let scene: Awaited<ReturnType<typeof import("@/lib/logo-scene").createLogoScene>> | undefined;
    let frame = 0;
    let disposed = false;
    let started = false;
    let top = 0;
    let distance = 1;
    let progress = -1;
    const update = () => {
      frame = 0;
      const next = media.matches ? 1 : clamp((window.scrollY - top) / distance);
      if (progress === next) return;
      progress = next;
      const height = (track.current?.firstElementChild as HTMLElement | undefined)?.offsetHeight || innerHeight;
      element.dataset.entered = String(progress >= 1);
      element.style.setProperty("--logo-zoom", String(progress));
      if (content.current) content.current.inert = !media.matches && progress < 1;
      if (!scene) {
        element.style.setProperty("--portal-x", `${innerWidth / 2}px`);
        element.style.setProperty("--portal-y", `${height / 2}px`);
        element.style.setProperty("--portal-radius", `${clamp((progress - .55) / .4) * Math.hypot(innerWidth, height)}px`);
      }
      scene?.setProgress(progress);
    };
    const measure = () => {
      top = element.getBoundingClientRect().top + window.scrollY;
      const stage = track.current?.firstElementChild as HTMLElement | undefined;
      distance = Math.max(1, (track.current?.offsetHeight || 0) - (stage?.offsetHeight || 0));
      progress = -1;
      update();
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const load = async () => {
      if (started || media.matches) return;
      started = true;
      try {
        const { createLogoScene } = await import("@/lib/logo-scene");
        if (disposed) return;
        const result = await createLogoScene(canvasHost, controller.signal, element);
        if (disposed) { result.dispose(); return; }
        scene = result;
        scene.setProgress(progress);
        setReady(true);
      } catch {
        // Keep the real logo and projects usable when WebGL or the model is unavailable.
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void load();
    }, { rootMargin: "500px" });
    observer.observe(element);
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const onMotion = () => { measure(); if (!media.matches) void load(); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", onMotion);
    return () => {
      disposed = true;
      controller.abort();
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
      scene?.dispose();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <div ref={section} className="logo-work-reveal" role="region" aria-label={isArabic ? "من هويتنا إلى أعمالنا" : "From our identity to our work"}>
      <div ref={track} className="logo-work-track">
      <div className="logo-work-stage" aria-hidden="true">
        <div ref={host} className="logo-work-canvas" />
        <div className={`logo-work-fallback ${ready ? "is-ready" : ""}`}>
          <Image src="/logo-mark-dark.svg" alt="" width={413} height={219} sizes="(max-width: 640px) 80vw, 600px" />
        </div>
      </div>
      </div>
      <div ref={content} className="logo-work-content">{children}</div>
    </div>
  );
}
