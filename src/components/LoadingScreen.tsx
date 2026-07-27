"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const leaveTimer = window.setTimeout(
      () => setLeaving(true),
      reduceMotion ? 350 : 2700
    );
    const removeTimer = window.setTimeout(
      () => setVisible(false),
      reduceMotion ? 650 : 3150
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
      className={`loading-screen fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#302451] transition-[opacity,visibility] duration-500 ${
        leaving ? "invisible opacity-0" : "visible opacity-100"
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
          src="/logo.png"
          alt="3M tech"
          width={620}
          height={390}
          priority
          className="loader-logo h-auto w-[210px] object-contain sm:w-[330px] lg:w-[430px]"
        />

        <div className="loader-track mt-12 h-[24px] w-full max-w-[520px] overflow-hidden rounded-full border-2 border-white/75 bg-[#958da3] p-[2px] shadow-[0_0_28px_rgba(255,255,255,.14)] sm:mt-16 sm:h-[30px]">
          <span className="loader-progress block h-full rounded-full bg-white" />
        </div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
