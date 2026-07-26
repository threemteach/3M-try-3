"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const ITEMS = [
  "UI / UX Designs",
  "Web Application",
  "E-commerce",
  "Scalable Websites",
  "Portfolio",
  "Digital Platforms",
];

export default function RotatingSpinner({ className = "" }: { className?: string }) {
  const [topIndex, setTopIndex] = useState(0);
  const count = ITEMS.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % count);
    }, 2200);
    return () => clearInterval(interval);
  }, [count]);

  const getPositionClass = (i: number) => {
    if (i === topIndex) return "pos-top";
    if (i === (topIndex + 1) % count) return "pos-mid";
    if (i === (topIndex + 2) % count) return "pos-bot";
    return "pos-hidden";
  };

  return (
    <div
      className={`inline-flex items-center justify-center lg:justify-start gap-[clamp(6px,1.2vw,18px)] whitespace-nowrap ${className}`}
    >
      <span
        className="shrink-0 text-white font-normal leading-[1.1]"
        style={{ fontFamily: '"MedulaOne", serif', fontSize: "clamp(32px, 7vw, 75px)" }}
      >
        WE Build
      </span>

      <span className="inline-block w-0 h-0 shrink-0 border-t-[8px] sm:border-t-[10px] md:border-t-[12px] border-t-transparent border-b-[8px] sm:border-b-[10px] md:border-b-[12px] border-b-transparent border-l-[12px] sm:border-l-[16px] md:border-l-[20px] border-l-white self-center" />

      <div
        className="relative inline-block h-[128px] min-w-[190px] overflow-hidden sm:h-[160px] sm:min-w-[320px] md:h-[190px] md:min-w-[390px] lg:h-[210px] lg:min-w-[300px] xl:min-w-[360px]"
      >
        {ITEMS.map((text, i) => {
          const pos = getPositionClass(i);
          return (
            <div
              key={text}
              className={`rotating-item absolute left-0 w-full whitespace-nowrap pointer-events-none transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${pos}`}
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
