"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MINIMUM_SPLASH_MS = 450;
const MAXIMUM_SPLASH_MS = 1800;

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const logoRef = useRef<HTMLImageElement>(null);
  const exitTriggered = useRef(false);

  useEffect(() => {
    const startedAt = performance.now();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Monitor real DOM and Resource loading progress
    let targetProgress = 15;

    const updateProgress = (val: number) => {
      targetProgress = Math.max(targetProgress, val);
    };

    // 1. DOM Ready state listener
    if (document.readyState === "loading") {
      updateProgress(25);
    } else if (document.readyState === "interactive") {
      updateProgress(65);
    } else if (document.readyState === "complete") {
      updateProgress(95);
    }

    const handleDomReady = () => updateProgress(70);
    const handleWindowLoad = () => updateProgress(100);

    document.addEventListener("DOMContentLoaded", handleDomReady);
    window.addEventListener("load", handleWindowLoad);

    // 2. Track Font Loading
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateProgress(85);
      });
    }

    // 3. Track Image Loading across DOM
    const images = Array.from(document.querySelectorAll("img"));
    if (images.length > 0) {
      let loadedImages = 0;
      const checkImageLoad = () => {
        loadedImages++;
        const imgPct = 30 + Math.round((loadedImages / images.length) * 65);
        updateProgress(imgPct);
      };

      images.forEach((img) => {
        if (img.complete) {
          checkImageLoad();
        } else {
          img.addEventListener("load", checkImageLoad, { once: true });
          img.addEventListener("error", checkImageLoad, { once: true });
        }
      });
    } else {
      updateProgress(80);
    }

    // Smooth progress interpolation matching real download status
    let currentPct = 0;
    let animFrame: number;

    const tick = () => {
      const minimumTimeElapsed =
        performance.now() - startedAt >= MINIMUM_SPLASH_MS;
      const displayedTarget =
        targetProgress >= 100 && !minimumTimeElapsed ? 96 : targetProgress;

      if (currentPct < displayedTarget) {
        const diff = displayedTarget - currentPct;
        const step = Math.max(1, Math.ceil(diff * 0.18));
        currentPct = Math.min(100, currentPct + step);
        setProgress(currentPct);
      }

      if (currentPct >= 100) {
        triggerExit();
      } else {
        animFrame = requestAnimationFrame(tick);
      }
    };

    animFrame = requestAnimationFrame(tick);

    // Safety fallback for a stalled resource. Fast connections still respect the
    // minimum presentation time; slow connections remain resource-driven.
    const fallbackTimer = setTimeout(() => {
      updateProgress(100);
    }, MAXIMUM_SPLASH_MS);

    function triggerExit() {
      if (exitTriggered.current) return;
      exitTriggered.current = true;

      const source = logoRef.current;
      if (source && !reduceMotion) {
        const sourceRect = source.getBoundingClientRect();
        const targets = Array.from(
          document.querySelectorAll<HTMLImageElement>('img[src*="/logo.png"]')
        ).filter((element) => {
          if (element === source) return false;
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.top < 180;
        });
        const target = targets.sort(
          (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
        )[0];

        if (target) {
          const targetRect = target.getBoundingClientRect();
          source.style.setProperty(
            "--loader-logo-x",
            `${targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2)}px`
          );
          source.style.setProperty(
            "--loader-logo-y",
            `${targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2)}px`
          );
          source.style.setProperty(
            "--loader-logo-scale",
            `${targetRect.width / sourceRect.width}`
          );
        }
      }

      window.requestAnimationFrame(() => setLeaving(true));

      window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = previousOverflow;
      }, reduceMotion ? 80 : 220);
    }

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(fallbackTimer);
      document.removeEventListener("DOMContentLoaded", handleDomReady);
      window.removeEventListener("load", handleWindowLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#302451] ${
        leaving ? "loading-screen-leaving" : ""
      }`}
      role="status"
      aria-label="Loading 3M tech"
    >
      <span className="loader-orb loader-orb-one" aria-hidden="true" />
      <span className="loader-orb loader-orb-two" aria-hidden="true" />
      <span className="loader-orb loader-orb-three" aria-hidden="true" />
      <span className="loader-orb loader-orb-four" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center px-7">
        <Image
          ref={logoRef}
          src="/logo.png"
          alt="3M tech"
          width={620}
          height={390}
          priority
          className={`loader-logo h-auto w-[210px] object-contain sm:w-[330px] lg:w-[430px] ${
            leaving ? "loader-logo-to-nav" : ""
          }`}
        />

        {/* Dynamic Real-Time Resource Progress Bar */}
        <div
          className={`loader-track relative mt-10 h-[26px] w-full max-w-[520px] overflow-hidden rounded-full border-2 border-white/75 bg-[#958da3]/60 p-[2px] shadow-[0_0_28px_rgba(255,255,255,.14)] backdrop-blur-md sm:mt-14 sm:h-[32px] ${
            leaving ? "loader-track-leaving" : ""
          }`}
        >
          <div
            className="loader-progress-dynamic h-full w-full rounded-full bg-gradient-to-r from-purple-200 via-white to-white transition-transform duration-100 ease-out"
            style={{ transform: `scaleX(${Math.max(6, progress) / 100})` }}
          />
        </div>

        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
