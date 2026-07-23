"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const ITEMS = [
  "E-commerce",
  "Web Application",
  "UI / UX Designs",
  "Scalable Websites",
  "Portfolio",
  "Digital Platforms",
];

export default function RotatingSpinner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = ITEMS.length;

  useEffect(() => {
    autoRotateRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 1500);
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [count]);

  return (
    <div className="flex items-center gap-3 mt-6">
      <span style={{ fontFamily: '"MedulaOne", serif', fontWeight: 400, fontSize: "clamp(24px, 4vw, 65px)" }} className="text-white whitespace-nowrap">
        WE Build
      </span>
      <span className="inline-block w-0 h-0 border-t-[10px] border-b-[10px] border-l-[16px] border-t-transparent border-b-transparent border-l-white flex-shrink-0" />
      <span key={activeIndex} style={{ fontFamily: '"MedulaOne", serif', fontWeight: 400, fontSize: "clamp(18px, 3vw, 48px)", textShadow: "0px 0px 42px rgba(255, 255, 255, 0.68)" }} className="text-white whitespace-nowrap">
        {ITEMS[activeIndex]}
      </span>
    </div>
  );
}
