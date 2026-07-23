"use client";

import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Our work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
];

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 hidden justify-center px-4 pt-4 sm:flex md:pt-5 lg:pt-8">
      <nav
        className="flex w-full max-w-full items-center justify-between rounded-[72px] px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 lg:px-12 lg:py-3.5 xl:py-4"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(7.5px)",
          WebkitBackdropFilter: "blur(7.5px)",
          boxShadow:
            "-13px 43px 18px rgba(0,0,0,0.01), -7px 24px 15px rgba(0,0,0,0.04), -3px 11px 11px rgba(0,0,0,0.07), -1px 3px 6px rgba(0,0,0,0.08)",
        }}
      >
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="3M Logo"
            width={80}
            height={50}
            className="h-[32px] w-auto object-contain sm:h-[36px] md:h-[40px] lg:h-[46px] xl:h-[56px]"
            priority
          />
        </Link>

        <ul className="flex shrink-0 items-center gap-2 whitespace-nowrap sm:gap-3 md:gap-4 lg:gap-8 xl:gap-12 2xl:gap-16">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="block whitespace-nowrap text-[12px] font-semibold leading-none text-white transition-opacity hover:opacity-80 sm:text-[13px] md:text-[14px] lg:text-[20px] xl:text-[28px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="flex h-[24px] w-[72px] shrink-0 items-center justify-center whitespace-nowrap rounded-[150px] bg-white text-[11px] font-bold leading-none text-[#302451] transition-opacity hover:opacity-90 sm:h-[26px] sm:w-[80px] sm:text-[12px] md:h-[28px] md:w-[90px] md:text-[14px] lg:h-[36px] lg:w-[120px] lg:text-[18px] xl:h-[44px] xl:w-[140px] xl:text-[22px]"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
