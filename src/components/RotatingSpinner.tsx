"use client";

import { useState, useEffect, useRef } from "react";

const ITEMS = [
  "E-commerce",
  "Web Application",
  "UI / UX Designs",
  "Scalable Websites",
  "Portfolio",
  "Digital Platforms",
];

export default function RotatingSpinner() {
  const [topIndex, setTopIndex] = useState(0);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = ITEMS.length;

  useEffect(() => {
    autoRotateRef.current = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % count);
    }, 1500);
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [count]);

  const getPosition = (i: number) => {
    if (i === topIndex) return "pos-top";
    if (i === (topIndex + 1) % count) return "pos-mid";
    if (i === (topIndex + 2) % count) return "pos-bot";
    return "pos-hidden";
  };

  return (
    <div className="flex items-center gap-3 mt-6">
      <span style={{ fontFamily: '"MedulaOne", serif', fontWeight: 400, fontSize: "clamp(24px, 4vw, 65px)", lineHeight: 1.1 }} className="text-white whitespace-nowrap">
        WE Build
      </span>
      <span className="inline-block w-0 h-0 border-t-[10px] border-b-[10px] border-l-[16px] border-t-transparent border-b-transparent border-l-white flex-shrink-0" />
      <div style={{ position: "relative", height: "clamp(36px, 5vw, 70px)", width: "clamp(130px, 16vw, 300px)", overflow: "hidden" }}>
        {ITEMS.map((text, i) => {
          const pos = getPosition(i);
          let opacity = 0;
          let scale = 1;

          if (pos === "pos-top") { opacity = 0.15; scale = 0.85; }
          else if (pos === "pos-mid") { opacity = 1; scale = 1; }
          else if (pos === "pos-bot") { opacity = 0.15; scale = 0.85; }
          else { opacity = 0; }

          return (
            <div
              key={text}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                fontFamily: '"MedulaOne", serif',
                fontWeight: 400,
                fontSize: "clamp(18px, 3vw, 48px)",
                lineHeight: "clamp(36px, 5vw, 70px)",
                color: "#ffffff",
                textShadow: pos === "pos-mid" ? "0px 0px 42px rgba(255, 255, 255, 0.68)" : "none",
                whiteSpace: "nowrap",
                opacity,
                transform: `scaleY(${scale})`,
                transition: "all 0.4s ease",
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
