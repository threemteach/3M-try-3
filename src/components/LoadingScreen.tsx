"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface NetworkConnection {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

type SpeedTier = "fast" | "medium" | "slow";

function getNetworkSpeedTier(): SpeedTier {
  if (typeof window === "undefined") return "fast";

  const nav = navigator as Navigator & {
    connection?: NetworkConnection;
    mozConnection?: NetworkConnection;
    webkitConnection?: NetworkConnection;
  };
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;

  if (conn) {
    if (conn.saveData) return "slow";

    const type = conn.effectiveType;
    const rtt = conn.rtt ?? 100;
    const downlink = conn.downlink ?? 10;

    if (type === "slow-2g" || type === "2g" || rtt > 350 || downlink < 0.8) {
      return "slow";
    }
    if (type === "3g" || rtt > 180 || downlink < 2.5) {
      return "medium";
    }
  }

  return "fast";
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Detect internet connection quality tier
    const speedTier = getNetworkSpeedTier();

    // Check if splash was already shown in this tab session
    const splashAlreadyShown = typeof window !== "undefined" && sessionStorage.getItem("3m_splash_shown") === "true";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let animFrame: number;
    let startTime: number | null = null;

    // Determine load duration dynamically based on connection quality
    let targetDuration = 360; // Fast 4G / Fiber connection
    if (splashAlreadyShown) {
      targetDuration = 160; // Instant sub-sequent client navigation
    } else if (speedTier === "medium") {
      targetDuration = 750; // 3G connection
    } else if (speedTier === "slow") {
      targetDuration = 1400; // 2G / Slow connection
    }

    if (reduceMotion) {
      targetDuration = 180;
    }

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const currentPct = Math.min(100, Math.round((elapsed / targetDuration) * 100));
      setProgress(currentPct);

      if (elapsed < targetDuration) {
        animFrame = requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        triggerExit();
      }
    };

    animFrame = requestAnimationFrame(animateProgress);

    const triggerExit = () => {
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
        if (typeof window !== "undefined") {
          sessionStorage.setItem("3m_splash_shown", "true");
        }
        document.body.style.overflow = previousOverflow;
      }, reduceMotion ? 150 : 350);
    };

    return () => {
      cancelAnimationFrame(animFrame);
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

        {/* Dynamic Internet-Aware Progress Bar */}
        <div
          className={`loader-track mt-10 h-[26px] w-full max-w-[520px] overflow-hidden rounded-full border-2 border-white/75 bg-[#958da3]/60 p-[2px] shadow-[0_0_28px_rgba(255,255,255,.14)] backdrop-blur-md sm:mt-14 sm:h-[32px] ${
            leaving ? "loader-track-leaving" : ""
          }`}
        >
          <div
            className="loader-progress-dynamic flex h-full items-center justify-end rounded-full bg-gradient-to-r from-purple-200 via-white to-white transition-all duration-75 ease-out pr-2.5"
            style={{ width: `${Math.max(6, progress)}%` }}
          >
            {progress > 18 && (
              <span className="text-[10px] font-bold text-[#302451] sm:text-[11px]">
                {progress}%
              </span>
            )}
          </div>
        </div>

        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
