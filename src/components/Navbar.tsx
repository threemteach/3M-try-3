"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/constants";
import { LanguageToggle } from "@/components/LanguageProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setScrolled(window.scrollY > 36);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  return (
    <header
      className={`navbar-shell pointer-events-none fixed left-0 right-0 top-0 z-[100] hidden justify-center px-4 transition-[padding] duration-300 sm:flex ${
        scrolled ? "pt-2 md:pt-3" : "pt-4 md:pt-6 lg:pt-8"
      }`}
    >
      <nav
        className={`navbar-glass pointer-events-auto mx-4 flex w-full items-center justify-between overflow-hidden rounded-[72px] border px-4 transition-[max-width,transform,border-color,background-color,box-shadow,padding] duration-300 hover:-translate-y-0.5 hover:border-white/30 sm:mx-6 sm:px-6 md:mx-8 md:px-8 lg:mx-12 lg:px-10 xl:mx-16 ${
          scrolled
            ? "max-w-[1180px] border-white/20 py-1.5 sm:py-2"
            : "max-w-[1400px] border-white/10 py-2 sm:py-2.5 lg:py-3"
        }`}
        style={{
          background: scrolled
            ? "rgba(48,36,81,0.88)"
            : "rgba(255,255,255,0.1)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(7.5px)",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(7.5px)",
          boxShadow: scrolled
            ? "0 12px 35px rgba(24,16,48,.24), inset 0 1px 0 rgba(255,255,255,.13)"
            : "-13px 43px 18px rgba(0,0,0,0.01), -7px 24px 15px rgba(0,0,0,0.04), -3px 11px 11px rgba(0,0,0,0.07), -1px 3px 6px rgba(0,0,0,0.08)",
        }}
      >
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="3M Logo"
            width={80}
            height={50}
            className={`w-auto object-contain transition-[height] duration-300 ${
              scrolled
                ? "h-[30px] sm:h-[32px] md:h-[35px] lg:h-[38px]"
                : "h-[32px] sm:h-[36px] md:h-[40px] lg:h-[46px]"
            }`}
            priority
          />
        </Link>

        <ul className="flex shrink-0 items-center gap-3 whitespace-nowrap sm:gap-4 md:gap-6 lg:gap-10 xl:gap-12">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="block whitespace-nowrap text-[13px] font-semibold leading-none text-white transition-opacity hover:opacity-80 sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[19px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="shrink-0">
            <Link
              href="/workflow"
              className="block whitespace-nowrap text-[13px] font-semibold leading-none text-white transition-opacity hover:opacity-80 sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[19px]"
            >
              Process
            </Link>
          </li>
        </ul>

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          <LanguageToggle compact />
          <Link
            href="/contact"
            className="flex h-[30px] w-[85px] shrink-0 items-center justify-center whitespace-nowrap rounded-[150px] bg-white text-[12px] font-bold leading-none text-[#302451] transition-opacity hover:opacity-90 sm:h-[32px] sm:w-[95px] sm:text-[13px] md:h-[36px] md:w-[105px] md:text-[14px] lg:h-[40px] lg:w-[120px] lg:text-[16px]"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
