export const featureIconOptions = [
  { value: "responsive", label: "Responsive devices" },
  { value: "search", label: "Search and filters" },
  { value: "performance", label: "Performance" },
  { value: "booking", label: "Booking and calendar" },
  { value: "globe", label: "Languages and global" },
  { value: "shield", label: "Security" },
  { value: "commerce", label: "Commerce" },
  { value: "design", label: "Design" },
  { value: "code", label: "Development" },
  { value: "analytics", label: "Analytics" },
  { value: "settings", label: "Settings and support" },
  { value: "star", label: "General highlight" },
] as const;

export type FeatureIconName = (typeof featureIconOptions)[number]["value"];

const paths: Record<FeatureIconName, React.ReactNode> = {
  responsive: (
    <>
      <rect x="3" y="4" width="13" height="10" rx="2" />
      <path d="M8 18h3M9.5 14v4" />
      <rect x="17" y="8" width="4" height="10" rx="1" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5M8 9h5M8 12h3" />
    </>
  ),
  performance: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 12 18.5 6M16 3h5v5" />
    </>
  ),
  booking: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18M8 15l2 2 5-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 20 6v6c0 5-3.2 8-8 10-4.8-2-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  commerce: (
    <>
      <path d="M3 4h2l2.2 10.5a2 2 0 0 0 2 1.5h7.7a2 2 0 0 0 2-1.6L20 8H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </>
  ),
  design: (
    <>
      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
      <path d="m14 7 3 3M5.5 16l3 3M13 20h8" />
    </>
  ),
  code: (
    <>
      <path d="m9 18-6-6 6-6M15 6l6 6-6 6M14 3l-4 18" />
    </>
  ),
  analytics: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      <path d="m4 7 6-4 6 7 5-5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
};

function normalizeIcon(icon: string): FeatureIconName {
  return featureIconOptions.some((option) => option.value === icon)
    ? (icon as FeatureIconName)
    : "star";
}

export default function FeatureIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[normalizeIcon(name)]}
    </svg>
  );
}
