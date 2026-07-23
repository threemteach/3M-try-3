"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
      </svg>
    ),
  },
  {
    href: "/projects",
    label: "Portfolio",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "About Us",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const W = 280;
const H = 70;
const R = 20;
const ITEMS = 4;
const BUBBLE_SIZE = 40;
const ITEM_H = 48;
const PAD_X = 20;

const getContainerPath = (index: number) => {
  const topY = R;
  const usable = W - PAD_X * 2;
  const gap = usable / ITEMS;
  const cx = PAD_X + gap * index + gap / 2;

  return [
    `M ${R},${topY}`,
    `L ${Math.max(R, cx - 38)},${topY}`,
    `C ${cx - 24},${topY} ${cx - 20},44 ${cx - 12},48`,
    `C ${cx - 5},50 ${cx + 5},50 ${cx + 13},48`,
    `C ${cx + 22},44 ${cx + 18},${topY} ${Math.min(W - R, cx + 38)},${topY}`,
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
      style={{
        padding: "0 16px",
        paddingBottom: "max(10px, env(safe-area-inset-bottom))",
      }}
      aria-label="Mobile navigation"
    >
      <div
        className="relative mx-auto overflow-visible"
        style={{ maxWidth: W, height: H }}
      >
        <svg
          className="absolute top-0 left-0 h-full w-full"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{
            zIndex: 0,
            pointerEvents: "none",
            filter: "drop-shadow(0 2px 8px rgba(48,36,81,0.10))",
          }}
        >
          <path
            d={pathD}
            fill="#ffffff"
            stroke="#302451"
            strokeWidth="1"
            style={{ transition: "d 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>

        <div
          className="pointer-events-none absolute flex items-center justify-center rounded-full"
          style={{
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            top: (H - BUBBLE_SIZE) / 2 + 2,
            left: `calc(${PAD_X}px + ((100% - ${PAD_X * 2}px) / ${ITEMS}) * ${activeIndex} + ((100% - ${PAD_X * 2}px) / ${ITEMS * 2}) - ${BUBBLE_SIZE / 2}px)`,
            background: "#302451",
            boxShadow:
              "0 4px 14px rgba(48,36,81,0.35), inset 0 1px 3px rgba(255,255,255,0.3)",
            transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 1,
          }}
        >
          <div className="flex h-[18px] w-[18px] items-center justify-center text-white">
            {navItems[activeIndex].icon}
          </div>
        </div>

        {navItems.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="absolute bottom-0 z-[2] flex flex-col items-center no-underline"
              style={{
                left: `calc(${PAD_X}px + ((100% - ${PAD_X * 2}px) / ${ITEMS}) * ${index})`,
                width: `calc((100% - ${PAD_X * 2}px) / ${ITEMS})`,
                height: ITEM_H,
                justifyContent: "flex-end",
                paddingBottom: 5,
                gap: 2,
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 18,
                  height: 18,
                  color: "#302451",
                  opacity: isActive ? 0 : 0.5,
                  transition: "opacity 0.25s ease",
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontFamily: '"Cairo", sans-serif',
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#302451",
                  opacity: isActive ? 1 : 0.5,
                  whiteSpace: "nowrap" as const,
                  transition: "opacity 0.25s ease",
                  lineHeight: 1,
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
