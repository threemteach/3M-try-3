"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  "main section > div > h1",
  "main section > div > h2",
  "main section > div > p",
  "main article",
  "main details",
  "main form",
  "main .approach-card",
  "main .project-feature-grid > *",
  "main .project-tech-stack > *",
].join(",");

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const candidates = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    const elements = candidates.filter((element) => {
      if (element.closest(".navbar-shell, .mobile-language-toggle, nav, footer")) return false;
      if (element.closest(".loading-screen")) return false;
      if (element.dataset.scrollRevealBound === "true") return false;
      return true;
    });

    elements.forEach((element, index) => {
      element.dataset.scrollRevealBound = "true";
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 30}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
