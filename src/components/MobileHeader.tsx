"use client";

import Image from "next/image";
import Link from "next/link";
import { LanguageToggle } from "@/components/LanguageProvider";

export default function MobileHeader() {
  return (
    <header
      dir="ltr"
      className="absolute inset-x-0 top-0 z-[1100] flex h-[58px] items-center px-5 sm:hidden"
    >
      <div dir="ltr" className="mx-auto flex w-full max-w-[520px] items-center justify-between">
        <Link href="/" aria-label="3M tech home" className="shrink-0">
          <Image
            src="/logo.png"
            alt="3M Logo"
            width={80}
            height={50}
            className="h-[32px] w-auto object-contain"
            priority
          />
        </Link>

        <div dir="ltr" className="flex shrink-0 items-center gap-2">
          <LanguageToggle compact />
          <Link
            href="/contact"
            className="flex h-[32px] w-[94px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-white px-2 text-[11px] font-bold text-[#302451] shadow-md"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
