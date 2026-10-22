"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/LanguageProvider";
import { Menu } from "lucide-react";

export default function MobileHeader() {
  const pathname = usePathname();
  const prefix = pathname === "/ar" || pathname.startsWith("/ar/") ? "/ar" : "";

  return (
    <header
      dir="ltr"
      className="absolute inset-x-0 top-0 z-[1100] flex h-[58px] items-center px-5 sm:hidden"
    >
      <div dir="ltr" className="mx-auto flex w-full max-w-[520px] items-center justify-between">
        <Link href={prefix || "/"} prefetch aria-label="3M tech home" className="shrink-0">
          <Image
            src="/3m_logo.png"
            alt="3M Logo"
            width={4576}
            height={2818}
            className="h-[32px] w-auto object-contain"
            priority
          />
        </Link>

        <div dir="ltr" className="flex shrink-0 items-center gap-2">
          <details key={pathname} className="relative">
            <summary aria-label="Plans and templates" className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-full border border-white/35 text-white marker:hidden [&::-webkit-details-marker]:hidden">
              <Menu className="h-4 w-4" aria-hidden="true" />
            </summary>
            <nav dir={prefix ? "rtl" : "ltr"} aria-label="Plans and templates" className="absolute right-0 top-11 z-50 w-56 rounded-lg border border-white/20 bg-[#302451] p-2 text-sm text-white shadow-xl">
              <Link href={`${prefix}/plans`} className="block rounded-md px-3 py-3 hover:bg-white/10">{prefix ? "الخطط" : "Plans"}</Link>
              <Link href={`${prefix}/templates`} className="block rounded-md px-3 py-3 hover:bg-white/10">{prefix ? "القوالب" : "Templates"}</Link>
            </nav>
          </details>
          <LanguageToggle compact />
          <Link
            href={`${prefix}/contact`}
            prefetch
            className="flex h-[32px] w-[94px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-white px-2 text-[11px] font-bold text-[#302451] shadow-md"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
