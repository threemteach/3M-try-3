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
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
      <span style={{
        fontFamily: '"MedulaOne", serif',
        fontWeight: 400,
        fontSize: "clamp(24px, 4vw, 65px)",
        lineHeight: 1.1,
        color: "#ffffff",
        whiteSpace: "nowrap",
      }}>
        WE Build
      </span>
      <span style={{
        width: 0,
        height: 0,
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
        borderLeft: "16px solid #ffffff",
        flexShrink: 0,
      }} />
      <div style={{
        position: "relative",
        height: "clamp(36px, 5vw, 70px)",
        overflow: "hidden",
      }}>
        {ITEMS.map((text, i) => (
          <div
            key={text}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              fontFamily: '"MedulaOne", serif',
              fontWeight: 400,
              fontSize: "clamp(20px, 3.5vw, 55px)",
              lineHeight: "clamp(36px, 5vw, 70px)",
              color: "#ffffff",
              textShadow: "0px 0px 42px rgba(255, 255, 255, 0.68)",
              whiteSpace: "nowrap",
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
