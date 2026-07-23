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
  const [topIndex, setTopIndex] = useState(0);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = ITEMS.length;

  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % count);
    }, 1500);
  }, [count]);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [startAutoRotate]);

  const getStyle = (i: number): React.CSSProperties => {
    const isActive = i === (topIndex + 1) % count;
    const isAbove = i === topIndex;
    const isBelow = i === (topIndex + 2) % count;

    let opacity = 0;
    let translateY = "200%";

    if (isActive) {
      opacity = 1;
      translateY = "0%";
    } else if (isAbove) {
      opacity = 0;
      translateY = "-100%";
    } else if (isBelow) {
      opacity = 0.15;
      translateY = "100%";
    }

    return {
      position: "absolute",
      left: 0,
      top: 0,
      fontFamily: '"MedulaOne", serif',
      fontWeight: 400,
      fontSize: "clamp(20px, 3.5vw, 55px)",
      lineHeight: "clamp(36px, 5vw, 70px)",
      color: "#ffffff",
      textShadow: "0px 0px 42px rgba(255, 255, 255, 0.68)",
      whiteSpace: "nowrap" as const,
      opacity,
      transform: `translateY(${translateY})`,
      transition: "all 0.4s ease",
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: 8, marginTop: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: '"MedulaOne", serif', fontWeight: 400, fontSize: "clamp(24px, 4vw, 65px)", lineHeight: 1.1, color: "#ffffff", whiteSpace: "nowrap" as const }}>
          WE Build
        </span>
        <span style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "16px solid #ffffff", flexShrink: 0 }} />
      </div>
      <div style={{ position: "relative", height: "clamp(36px, 5vw, 70px)", overflow: "hidden" }}>
        {ITEMS.map((text, i) => (
          <div key={text} style={getStyle(i)}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
