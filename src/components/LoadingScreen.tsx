"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const leaveTimer = window.setTimeout(() => {
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
    }, reduceMotion ? 350 : 2700);
    const removeTimer = window.setTimeout(
      () => setVisible(false),
      reduceMotion ? 650 : 3400
    );

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
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

        <div className={`loader-track mt-12 h-[24px] w-full max-w-[520px] overflow-hidden rounded-full border-2 border-white/75 bg-[#958da3] p-[2px] shadow-[0_0_28px_rgba(255,255,255,.14)] sm:mt-16 sm:h-[30px] ${leaving ? "loader-track-leaving" : ""}`}>
          <span className="loader-progress block h-full rounded-full bg-white" />
        </div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
