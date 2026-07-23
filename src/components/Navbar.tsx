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
    <header className="absolute top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
      <nav
        className="flex w-full max-w-[1360px] items-center justify-between rounded-[85px] px-5 py-2.5 sm:px-8 md:py-3 lg:px-14"
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
            width={95}
            height={60}
            className="h-[60px] w-auto object-contain"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[24px] font-semibold leading-none text-white transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden h-[42px] w-[155px] shrink-0 items-center justify-center rounded-[170px] bg-white text-[25px] font-bold leading-none text-[#302451] transition-opacity hover:opacity-90 lg:inline-flex"
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
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="absolute left-0 right-0 top-[85px] z-50 mx-4 overflow-hidden rounded-[20px] lg:hidden"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(7.5px)",
            WebkitBackdropFilter: "blur(7.5px)",
            boxShadow:
              "-13px 43px 18px rgba(0,0,0,0.01), -7px 24px 15px rgba(0,0,0,0.04), -3px 11px 11px rgba(0,0,0,0.07), -1px 3px 6px rgba(0,0,0,0.08)",
          }}
        >
          <ul className="flex flex-col gap-2 px-5 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex h-[42px] w-full items-center justify-center rounded-[170px] bg-white text-[17px] font-bold text-[#302451]"
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
