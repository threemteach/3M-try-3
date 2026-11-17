"use client";

import { Children, cloneElement, isValidElement, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { useDrag } from "@use-gesture/react";

export default function ServiceCarousel({ children, arabic }: { children: ReactNode; arabic: boolean }) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockUntil = useRef(0);

  const interact = useCallback(() => {
    setCooldown(true);
    if (resume.current) clearTimeout(resume.current);
    resume.current = setTimeout(() => setCooldown(false), 8000);
  }, []);

  const select = useCallback((index: number, manual = true) => {
    if (manual) interact();
    if (performance.now() < lockUntil.current) return;
    if (root.current) delete root.current.dataset.scrollDriven;
    lockUntil.current = performance.now() + (reduced ? 0 : 720);
    setActive((index + count) % count);
  }, [count, interact, reduced]);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= .5), { threshold: .5 });
    if (root.current) observer.observe(root.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    const finishPointer = () => setDragging(false);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointerup", finishPointer);
    window.addEventListener("pointercancel", finishPointer);
    return () => {
      media.removeEventListener("change", sync);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointerup", finishPointer);
      window.removeEventListener("pointercancel", finishPointer);
      if (resume.current) clearTimeout(resume.current);
    };
  }, []);

  const paused = !playing || reduced || !visible || !pageVisible || hovered || focused || dragging || cooldown;
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => select(active + 1, false), 5500);
    return () => clearTimeout(timer);
  }, [active, paused, select]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (reduced) { delete element.dataset.scrollDriven; return; }
    let start = 0;
    let travel = 1;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.max(0, Math.min(count - 1, (window.scrollY - start) / travel * (count - 1)));
      element.dataset.scrollDriven = "true";
      element.style.setProperty("--paper-progress", String(progress));
      setActive(current => current === Math.floor(progress) ? current : Math.floor(progress));
    };
    const measure = () => {
      const rect = element.getBoundingClientRect();
      const deck = element.querySelector<HTMLElement>(".service-carousel-deck");
      const cardHeight = deck?.offsetHeight || 180;
      const topPadding = parseFloat(getComputedStyle(element).paddingTop) || 0;
      const centeredTop = window.innerHeight / 2 - topPadding - cardHeight / 2;
      start = rect.top + window.scrollY - centeredTop;
      travel = Math.max(180, centeredTop - 16);
      if (element.dataset.scrollDriven === "true") update();
    };
    const onScroll = () => {
      if (window.scrollY < start && element.dataset.scrollDriven !== "true") return;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    observer.observe(document.body);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [count, reduced]);

  const bind = useDrag(({ first, last, movement: [x], swipe: [swipeX], canceled }) => {
    if (first) { setDragging(true); interact(); }
    if (last || canceled) {
      setDragging(false);
      if (!canceled && (Math.abs(x) > 45 || swipeX)) select(active + ((x || swipeX) < 0 ? 1 : -1));
    }
  }, { axis: "x", filterTaps: true, threshold: 10, pointer: { touch: true } });

  return (
    <div ref={root} className="service-carousel" role="region" aria-roledescription="carousel" aria-label={arabic ? "خدماتنا" : "Our services"} tabIndex={0}
      onPointerDownCapture={() => { setDragging(true); interact(); }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
      onKeyDown={e => {
        if (e.key === " " && e.target === e.currentTarget) { e.preventDefault(); setPlaying(value => !value); }
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select(active + 1); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select(active - 1); }
      }}>
      <div {...bind()} className="service-carousel-deck" data-active={active}>
        {slides.map((slide, index) => {
          if (!isValidElement(slide)) return null;
          const layer = (index - active + count) % count;
          const element = slide as ReactElement<{ style?: CSSProperties; children?: ReactNode }>;
          return cloneElement(element, {
            ...({ "data-active": layer === 0, "aria-hidden": layer !== 0, inert: layer !== 0, role: "group", "aria-roledescription": "slide", "aria-label": `${index + 1} / ${count}` }),
            style: { ...element.props.style, "--layer": layer, "--paper-index": index, zIndex: count - layer } as CSSProperties,
            children: <><span className="service-card-number" aria-hidden="true" data-preserve-font="true">{String(index + 1).padStart(2, "0")}</span>{element.props.children}</>,
          });
        })}
      </div>
      <span className="sr-only" role="status" aria-live={paused ? "polite" : "off"}>{arabic ? `الخدمة ${active + 1} من ${count}` : `Service ${active + 1} of ${count}`}</span>
    </div>
  );
}
