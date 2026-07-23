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
    <header className="absolute top-0 left-0 right-0 z-50 hidden justify-center px-4 pt-4 lg:flex">
      <nav
        className="flex w-full max-w-[1150px] items-center justify-between rounded-[72px] px-4 py-2 sm:px-6 md:py-2.5 lg:px-12"
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
            className="h-[50px] w-auto object-contain"
            priority
          />
        </Link>

        <ul className="flex items-center gap-4 xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[20px] font-semibold leading-none text-white transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="flex h-[36px] w-[130px] shrink-0 items-center justify-center rounded-[150px] bg-white text-[21px] font-bold leading-none text-[#302451] transition-opacity hover:opacity-90"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
