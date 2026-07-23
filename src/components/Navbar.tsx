"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Our work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex justify-center px-4 pt-8">
      <nav
        className="flex w-full max-w-[1602px] items-center justify-between rounded-[100px] px-6 py-3 sm:px-10 md:py-4 lg:px-16"
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
            width={111}
            height={70}
            className="h-[70px] w-auto object-contain"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[29px] font-semibold leading-none text-white transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden h-[49px] w-[181px] shrink-0 items-center justify-center rounded-[200px] bg-white text-[30px] font-bold leading-none text-[#302451] transition-opacity hover:opacity-90 lg:inline-flex"
        >
          Contact
        </Link>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="absolute left-0 right-0 top-[100px] z-50 mx-4 overflow-hidden rounded-[24px] lg:hidden"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(7.5px)",
            WebkitBackdropFilter: "blur(7.5px)",
            boxShadow:
              "-13px 43px 18px rgba(0,0,0,0.01), -7px 24px 15px rgba(0,0,0,0.04), -3px 11px 11px rgba(0,0,0,0.07), -1px 3px 6px rgba(0,0,0,0.08)",
          }}
        >
          <ul className="flex flex-col gap-2 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-lg font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex h-[49px] w-full items-center justify-center rounded-[200px] bg-white text-[20px] font-bold text-[#302451]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
