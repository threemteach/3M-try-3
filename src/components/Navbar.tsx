"use client";

import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 hidden justify-center px-4 pt-4 sm:flex md:pt-6 lg:pt-8">
      <nav
        className="flex w-full items-center justify-between rounded-[72px] px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 lg:px-10 lg:py-3 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 max-w-[1400px]"
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
            className="h-[32px] w-auto object-contain sm:h-[36px] md:h-[40px] lg:h-[46px]"
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
              href="/#process"
              className="block whitespace-nowrap text-[13px] font-semibold leading-none text-white transition-opacity hover:opacity-80 sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[19px]"
            >
              Process
            </Link>
          </li>
        </ul>

        <Link
          href="/contact"
          className="flex h-[30px] w-[85px] shrink-0 items-center justify-center whitespace-nowrap rounded-[150px] bg-white text-[12px] font-bold leading-none text-[#302451] transition-opacity hover:opacity-90 sm:h-[32px] sm:w-[95px] sm:text-[13px] md:h-[36px] md:w-[105px] md:text-[14px] lg:h-[40px] lg:w-[120px] lg:text-[16px]"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
