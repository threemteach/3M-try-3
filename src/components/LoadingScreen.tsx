"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface NetworkConnection {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

type SpeedInfo = {
  tier: "fast" | "medium" | "slow";
  labelEn: string;
  labelAr: string;
};

function getNetworkSpeedInfo(): SpeedInfo {
  if (typeof window === "undefined") {
    return { tier: "fast", labelEn: "⚡ Fast Network (4G)", labelAr: "⚡ اتصال فائق السرعة (4G)" };
  }

  const nav = navigator as Navigator & {
    connection?: NetworkConnection;
    mozConnection?: NetworkConnection;
    webkitConnection?: NetworkConnection;
  };
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;

  if (conn) {
    if (conn.saveData) {
      return { tier: "slow", labelEn: "📡 Data Saver Mode", labelAr: "📡 موفّر البيانات مفعّل" };
    }

    const type = conn.effectiveType;
    const rtt = conn.rtt ?? 100;
    const downlink = conn.downlink ?? 10;

    if (type === "slow-2g" || type === "2g" || rtt > 350 || downlink < 0.8) {
      return { tier: "slow", labelEn: "📡 Slow Connection - Loading...", labelAr: "📡 اتصال بطيء - جاري التحميل..." };
    }
    if (type === "3g" || rtt > 180 || downlink < 2.5) {
      return { tier: "medium", labelEn: "📶 Moderate Speed (3G)", labelAr: "📶 اتصال متوسط (3G)" };
    }
  }

  return { tier: "fast", labelEn: "⚡ Fast Network (4G/WiFi)", labelAr: "⚡ اتصال فائق السرعة (4G)" };
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speedInfo, setSpeedInfo] = useState<SpeedInfo>({
    tier: "fast",
    labelEn: "⚡ Fast Network",
    labelAr: "⚡ اتصال فائق السرعة",
  });
  const [isArabic, setIsArabic] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if Arabic
    const isAr = document.documentElement.dir === "rtl" || window.location.pathname.startsWith("/ar");
    setIsArabic(isAr);

    // Detect internet connection quality
    const speed = getNetworkSpeedInfo();
    setSpeedInfo(speed);

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
    } else if (speed.tier === "medium") {
      targetDuration = 750; // 3G connection
    } else if (speed.tier === "slow") {
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

        {/* Real-time Internet Quality / Connection Badge */}
        <div
          className={`mt-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 shadow-lg backdrop-blur-md transition-all duration-300 sm:mt-5 ${
            leaving ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              speedInfo.tier === "fast"
                ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"
                : speedInfo.tier === "medium"
                ? "bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]"
                : "bg-rose-400 animate-ping"
            }`}
          />
          <span>{isArabic ? speedInfo.labelAr : speedInfo.labelEn}</span>
        </div>

        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
