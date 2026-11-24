"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./StudioStatement.module.css";

const copy = {
  ar: [
    "أكثر من مجرد شركة برمجيات. نحن الشريك التقني الذي يحوّل رؤيتك إلى واقع رقمي استثنائي.",
    { accent: "نبتكر، نصمم، ونطوّر حلولًا رقمية" }, "تجمع بين",
    { accent: "الإبداع والدقة الهندسية والأداء الفائق." },
    "رحلتنا معك لا تنتهي عند الإطلاق، بل تبدأ منه، لأن",
    { accent: "نجاحك" }, "هو امتداد", { accent: "لنجاحنا." },
  ],
  en: [
    "More than a software company. We’re the technology partner that brings your vision to life. We",
    { accent: "design and build digital products" }, "that combine",
    { accent: "creativity, precise engineering, and exceptional performance." },
    "Our partnership doesn’t end at launch. That’s where it begins, because",
    { accent: "your success" }, "is part of", { accent: "ours." },
  ],
};

export default function StudioStatement() {
  const { language } = useLanguage();
  const band = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const paragraph = useRef<HTMLParagraphElement>(null);
  const words = copy[language].flatMap(part =>
    (typeof part === "string" ? part : part.accent).split(" ").map(word => ({ word, accent: typeof part !== "string" }))
  );
  const count = words.length;

  useEffect(() => {
    const node = paragraph.current;
    const track = band.current;
    const panel = stage.current;
    if (!node || !track || !panel) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      if (!track.hasAttribute("data-pinned")) return;
      const { top, height } = track.getBoundingClientRect();
      const travel = height - panel.offsetHeight;
      // Leave a short hold at the end so the whole paragraph can be read before it exits.
      const progress = Math.max(0, Math.min(1, -top / Math.max(1, travel * 0.92)));
      if (progress === last) return;
      last = progress;
      node.style.setProperty("--read-position", String(progress * (count + 3)));
    };
    const schedule = () => {
      if (!frame && track.hasAttribute("data-pinned")) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      const css = getComputedStyle(panel);
      const required = node.offsetHeight + parseFloat(css.paddingTop) + parseFloat(css.paddingBottom);
      track.toggleAttribute("data-pinned", !motion.matches && required <= document.documentElement.clientHeight);
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", measure);
    };
  }, [count]);

  return (
    <div ref={band} id="studio-statement" className={styles.band} lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <div ref={stage} className={styles.stage}>
        <p ref={paragraph} className={styles.copy}>
          {words.map(({ word, accent }, index) => (
            <span key={index} className={accent ? styles.accent : undefined} style={{ "--word": index } as CSSProperties}>
              {word}{index < count - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
