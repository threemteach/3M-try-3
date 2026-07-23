"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const ITEMS = [
  "E-commerce",
  "Web Application",
  "UI/UX Designs",
  "Scalable Websites",
  "Portfolio",
  "Digital Platforms",
];

export default function RotatingSpinner({ className = "" }: { className?: string }) {
  const [topIndex, setTopIndex] = useState(0);
  const spinDirection = useRef(1);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = ITEMS.length;

  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = setInterval(() => {
      setTopIndex((prev) =>
        spinDirection.current > 0
          ? (prev + 1) % count
          : (prev - 1 + count) % count
      );
    }, 1500);
  }, [count]);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [startAutoRotate]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      spinDirection.current = e.deltaY > 0 ? 1 : -1;
      setTopIndex((prev) =>
        spinDirection.current > 0
          ? (prev + 1) % count
          : (prev - 1 + count) % count
      );
      startAutoRotate();
    },
    [count, startAutoRotate]
  );

  const getPosition = (i: number) => {
    if (i === topIndex) return 0;
    if (i === (topIndex + 1) % count) return 1;
    if (i === (topIndex + 2) % count) return 2;
    return 3;
  };

  return (
    <div
      onWheel={handleWheel}
      className={`inline-flex items-center gap-[clamp(10px,1.5vw,24px)] whitespace-nowrap ${className}`}
    >
      <span
        className="shrink-0 text-white"
        style={{ fontFamily: '"MedulaOne", serif', fontSize: "clamp(24px, 4vw, 65px)", lineHeight: "1.1" }}
      >
        WE Build
      </span>
      <span className="inline-block w-0 h-0 shrink-0 border-t-[10px] sm:border-t-[12px] border-t-transparent border-b-[10px] sm:border-b-[12px] border-b-transparent border-l-[16px] sm:border-l-[20px] border-l-white self-center" />
      <div
        className="relative inline-block overflow-hidden"
        style={{ minWidth: "30vw", height: "210px" }}
      >
        {ITEMS.map((text, i) => {
          const pos = getPosition(i);
          const styles = [
            { top: "0px", opacity: 0.15, transform: "scale(0.85)" },
            { top: "70px", opacity: 1, transform: "scale(1)" },
            { top: "140px", opacity: 0.15, transform: "scale(0.85)" },
            { top: "140px", opacity: 0, transform: "translateY(40px) scale(0.85)" },
          ];
          return (
            <div
              key={text}
              className="rotating-item absolute left-0 w-full whitespace-nowrap pointer-events-none transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              style={{
                ...styles[pos],
                fontSize: "clamp(20px, 3.5vw, 55px)",
                lineHeight: "70px",
              }}
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
