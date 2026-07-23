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

  const getPosition = (i: number) => {
    if (i === topIndex) return "pos-top";
    if (i === (topIndex + 1) % count) return "pos-mid";
    if (i === (topIndex + 2) % count) return "pos-bot";
    return "pos-hidden";
  };

  return (
    <>
      <style>{`
        .spinner-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          margin-top: 24px;
        }
        .spinner-top-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .spinner-build-text {
          font-family: "MedulaOne", serif;
          font-weight: 400;
          font-size: clamp(24px, 4vw, 65px);
          line-height: 1.1;
          color: #ffffff;
          white-space: nowrap;
        }
        .spinner-polygon {
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 16px solid #ffffff;
          flex-shrink: 0;
        }
        .spinner-wrapper {
          position: relative;
          height: clamp(36px, 5vw, 70px);
          overflow: hidden;
        }
        .spinner-item {
          font-family: "MedulaOne", serif;
          font-weight: 400;
          font-size: clamp(20px, 3.5vw, 55px);
          line-height: clamp(36px, 5vw, 70px);
          color: #ffffff;
          text-shadow: 0px 0px 42px rgba(255, 255, 255, 0.68);
          white-space: nowrap;
          position: absolute;
          left: 0;
          top: 0;
          transition: all 0.4s ease;
        }
        .spinner-item.pos-top {
          opacity: 0;
          transform: translateY(-100%);
        }
        .spinner-item.pos-mid {
          opacity: 1;
          transform: translateY(0);
        }
        .spinner-item.pos-bot {
          opacity: 0.15;
          transform: translateY(100%);
        }
        .spinner-item.pos-hidden {
          opacity: 0;
          transform: translateY(200%);
        }
      `}</style>
      <div className="spinner-container">
        <div className="spinner-top-row">
          <span className="spinner-build-text">WE Build</span>
          <span className="spinner-polygon" />
        </div>
        <div className="spinner-wrapper">
          {ITEMS.map((text, i) => (
            <div key={text} className={`spinner-item ${getPosition(i)}`}>
              {text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
