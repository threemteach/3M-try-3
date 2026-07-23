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

  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 1500);
  }, [count]);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [startAutoRotate]);

  return (
    <div className="flex items-center gap-3 mt-6">
      <span className="font-[family-name:var(--font-cairo)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white whitespace-nowrap">
        WE Build
      </span>
      <span className="inline-block w-0 h-0 border-t-[10px] border-b-[10px] border-l-[16px] border-t-transparent border-b-transparent border-l-white flex-shrink-0" />
      <div className="relative h-[40px] sm:h-[50px] md:h-[60px] lg:h-[70px] overflow-hidden">
        {ITEMS.map((text, i) => (
          <div
            key={text}
            className={`absolute left-0 top-0 font-[family-name:var(--font-cairo)] text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white whitespace-nowrap transition-opacity duration-300 ease-in-out ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
            style={{
              lineHeight: "40px",
              textShadow: "0px 0px 42px rgba(255, 255, 255, 0.68)",
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
