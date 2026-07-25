export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  tags: string[];
  features: { icon: string; title: string; desc: string }[];
  liveUrl: string;
  completionDate?: string;
  client?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "royal-car",
    title: "Royal Car",
    category: "Luxury Automotive Platform",
    description:
      "A professional corporate website for a luxury car rental and consulting company showcasing their portfolio and services.",
    longDescription:
      "Royal Car is a high-end luxury vehicle rental and dealership platform designed with an immersive dark aesthetic, real-time vehicle filtering, multi-currency pricing, and responsive mobile booking workflow.",
    image: "/royalcars-preview.png",
    gallery: [
      "/royalcars-preview.png",
      "/royalcars-preview.png",
      "/royalcars-preview.png",
    ],
    tags: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    features: [
      {
        icon: "📱",
        title: "100% Responsive Design",
        desc: "Pixel-perfect layout across all screens from iPhone SE to 4K monitors.",
      },
      {
        icon: "🔍",
        title: "Instant Live Search & Filters",
        desc: "Filter vehicles by category, brand, price range, and transmission type.",
      },
      {
        icon: "⚡",
        title: "SEO & High Speed Performance",
        desc: "Optimized for search engines with dynamic OpenGraph meta tags and instant image loading.",
      },
      {
        icon: "🛡️",
        title: "Seamless Booking Workflow",
        desc: "Interactive multi-step reservation system with instant WhatsApp confirmation.",
      },
    ],
    liveUrl: "https://royal-ccrs.vercel.app/",
    completionDate: "2024",
    client: "Royal Car UAE",
  },
  {
    id: "rent-and-go",
    title: "Rent & Go",
    category: "Car Rental Platform (UAE)",
    description:
      "Premium car rental platform with seamless booking, fleet showcase, and responsive multi-language support across the UAE.",
    longDescription:
      "Rent & Go provides an end-to-end car rental booking service across the UAE, featuring live availability calendars, multi-language support (Arabic & English), and automated customer inquiry dispatching.",
    image: "/rentgo-preview.png",
    gallery: [
      "/rentgo-preview.png",
      "/rentgo-preview.png",
      "/rentgo-preview.png",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "UI/UX"],
    features: [
      {
        icon: "📱",
        title: "Mobile-First UX",
        desc: "Tailored swipeable touch navigation and fluid mobile booking interface.",
      },
      {
        icon: "🔍",
        title: "Advanced Search & Catalog",
        desc: "Real-time search with location filtering, daily rates, and deposit specs.",
      },
      {
        icon: "🌐",
        title: "Multi-Language Support",
        desc: "Seamless language switcher between English and Arabic with RTL layouts.",
      },
      {
        icon: "⚡",
        title: "Ultra Fast Performance",
        desc: "Lighthouse 98+ score with server-side rendering and static asset caching.",
      },
    ],
    liveUrl: "https://rent-go.ae/",
    completionDate: "2024",
    client: "Rent & Go Mobility",
  },
  {
    id: "setup-platform",
    title: "Setup Platform",
    category: "E-Commerce & Digital Showcase",
    description:
      "Modern e-commerce showcase featuring product categories, custom quote requests, and interactive catalog browsing.",
    longDescription:
      "Setup Platform is a comprehensive digital catalog built for interior design and equipment, allowing clients to explore product galleries, compare specifications, and request tailored business quotes.",
    image: "/royalcars-preview.png",
    gallery: [
      "/royalcars-preview.png",
      "/royalcars-preview.png",
      "/royalcars-preview.png",
    ],
    tags: ["React.js", "Next.js", "Tailwind CSS", "Full-Stack"],
    features: [
      {
        icon: "📱",
        title: "Adaptive Responsive Layout",
        desc: "Fluid CSS grid adjusting dynamically to desktop, iPad, and mobile displays.",
      },
      {
        icon: "🔍",
        title: "Category Search & Tags",
        desc: "Categorized inventory with instant keyword search and tag navigation.",
      },
      {
        icon: "🛍️",
        title: "Interactive Quote System",
        desc: "Clients can build custom cart requests and submit directly via Email & WhatsApp.",
      },
      {
        icon: "🔒",
        title: "Secure & Scalable",
        desc: "Built on modern Next.js App Router with secure server-less architecture.",
      },
    ],
    liveUrl: "https://royal-ccrs.vercel.app/",
    completionDate: "2024",
    client: "Setup Studios",
  },
];
