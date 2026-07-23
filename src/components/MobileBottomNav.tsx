"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
      </svg>
    ),
  },
  {
    href: "/projects",
    label: "Portfolio",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "About Us",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/process",
    label: "Process",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <line x1="6.5" y1="10" x2="6.5" y2="14" />
        <line x1="17.5" y1="10" x2="17.5" y2="14" />
        <line x1="10" y1="6.5" x2="14" y2="6.5" />
        <line x1="10" y1="17.5" x2="14" y2="17.5" />
      </svg>
    ),
  },
];

const getContainerPath = (index: number) => {
  const W = 320, H = 84, R = 24;
  const topY = R;
  const cx = 58 + 68 * index;

  return [
    `M ${R},${topY}`,
    `L ${Math.max(R, cx - 44)},${topY}`,
    `C ${cx - 28},${topY} ${cx - 24},49 ${cx - 15},54`,
    `C ${cx - 6},56 ${cx + 6},56 ${cx + 16},54`,
    `C ${cx + 28},49 ${cx + 24},${topY} ${Math.min(W - R, cx + 44)},${topY}`,
    `L ${W - R},${topY}`,
    `A ${R},${R} 0 0 1 ${W},${topY + R}`,
    `L ${W},${H - R}`,
    `A ${R},${R} 0 0 1 ${W - R},${H}`,
    `L ${R},${H}`,
    `A ${R},${R} 0 0 1 0,${H - R}`,
    `L 0,${topY + R}`,
    `A ${R},${R} 0 0 1 ${R},${topY}`,
    "Z",
  ].join(" ");
};

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const idx = navItems.findIndex((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    );
    if (idx !== -1) setActiveIndex(idx);
  }, [pathname]);

  const pathD = useMemo(() => getContainerPath(activeIndex), [activeIndex]);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[1000] lg:hidden"
      style={{ padding: "0 24px", paddingBottom: "max(14px, env(safe-area-inset-bottom))" }}
      aria-label="Mobile navigation"
    >
      <div
        className="mx-auto flex items-end justify-between overflow-visible"
        style={{ maxWidth: 320, height: 84, padding: "0 24px" }}
      >
        <svg
          className="absolute top-0 left-0 h-full w-full"
          viewBox="0 0 320 84"
          preserveAspectRatio="none"
          style={{ zIndex: 0, pointerEvents: "none", filter: "drop-shadow(0 4px 12px rgba(48,36,81,0.08))" }}
        >
          <path
            d={pathD}
            fill="#ffffff"
            stroke="#302451"
            strokeWidth="1"
            style={{ transition: "d 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>

        <div
          className="pointer-events-none absolute flex items-center justify-center rounded-full"
          style={{
            width: 47,
            height: 47,
            top: 2,
            left: `calc(24px + ((100% - 48px) / 4) * ${activeIndex} + ((100% - 48px) / 8) - 23.5px)`,
            background: "#302451",
            boxShadow: "0 4px 15px rgba(48,36,81,0.12), inset 0 2px 4px rgba(255,255,255,0.4)",
            transition: "left 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 1,
          }}
        >
          <div className="flex h-[22px] w-[22px] items-center justify-center text-white">
            {navItems[activeIndex].icon}
          </div>
        </div>

        {navItems.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative z-[2] flex flex-1 flex-col items-center justify-end no-underline"
              style={{
                height: 56,
                gap: 4,
                paddingBottom: 7,
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 20,
                  height: 20,
                  color: "#302451",
                  opacity: isActive ? 0 : 0.55,
                  transition: "opacity 0.3s ease",
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontFamily: '"Cairo", sans-serif',
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "#302451",
                  opacity: isActive ? 1 : 0.55,
                  whiteSpace: "nowrap" as const,
                  transition: "opacity 0.3s ease",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
