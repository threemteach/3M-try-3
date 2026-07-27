import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY before running this one-time migration."
  );
}

const supabase = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const projects = [
  {
    slug: "royal-car",
    title: "Royal Car",
    category: "Luxury Automotive Platform",
    description:
      "A professional corporate website for a luxury car rental and consulting company showcasing their portfolio and services.",
    long_description:
      "Royal Car is a high-end luxury vehicle rental and dealership platform designed with an immersive dark aesthetic, real-time vehicle filtering, multi-currency pricing, and responsive mobile booking workflow.",
    sourceImage: "public/royalcars-preview.png",
    tags: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    features: [
      { icon: "responsive", title: "100% Responsive Design", description: "Pixel-perfect layout across all screens from iPhone SE to 4K monitors." },
      { icon: "search", title: "Instant Live Search & Filters", description: "Filter vehicles by category, brand, price range, and transmission type." },
      { icon: "performance", title: "SEO & High Speed Performance", description: "Optimized for search engines with dynamic OpenGraph metadata and fast image loading." },
      { icon: "booking", title: "Seamless Booking Workflow", description: "Interactive multi-step reservation system with instant WhatsApp confirmation." },
    ],
    live_url: "https://royal-ccrs.vercel.app/",
    completion_date: "2024",
    client: "Royal Car UAE",
    display_order: 0,
  },
  {
    slug: "rent-and-go",
    title: "Rent & Go",
    category: "Car Rental Platform (UAE)",
    description:
      "Premium car rental platform with seamless booking, fleet showcase, and responsive multi-language support across the UAE.",
    long_description:
      "Rent & Go provides an end-to-end car rental booking service across the UAE, featuring live availability calendars, multi-language support in Arabic and English, and automated customer inquiry dispatching.",
    sourceImage: "public/rentgo-preview.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "UI/UX"],
    features: [
      { icon: "responsive", title: "Mobile-First UX", description: "Tailored swipeable touch navigation and a fluid mobile booking interface." },
      { icon: "search", title: "Advanced Search & Catalog", description: "Real-time search with location filtering, daily rates, and deposit specifications." },
      { icon: "globe", title: "Multi-Language Support", description: "Seamless switching between English and Arabic with RTL layouts." },
      { icon: "performance", title: "Ultra Fast Performance", description: "Server rendering and optimized static assets provide a fast customer experience." },
    ],
    live_url: "https://rent-go.ae/",
    completion_date: "2024",
    client: "Rent & Go Mobility",
    display_order: 1,
  },
  {
    slug: "setup-platform",
    title: "Setup Platform",
    category: "E-Commerce & Digital Showcase",
    description:
      "Modern e-commerce showcase featuring product categories, custom quote requests, and interactive catalog browsing.",
    long_description:
      "Setup Platform is a comprehensive digital catalog built for interior design and equipment, allowing clients to explore product galleries, compare specifications, and request tailored business quotes.",
    sourceImage: "public/royalcars-preview.png",
    tags: ["React.js", "Next.js", "Tailwind CSS", "Full-Stack"],
    features: [
      { icon: "responsive", title: "Adaptive Responsive Layout", description: "Fluid layouts adjust dynamically across desktop, tablet, and mobile displays." },
      { icon: "search", title: "Category Search & Tags", description: "Categorized inventory with instant keyword search and tag navigation." },
      { icon: "commerce", title: "Interactive Quote System", description: "Clients can build custom requests and submit them through Email or WhatsApp." },
      { icon: "shield", title: "Secure & Scalable", description: "Built on the modern Next.js App Router with a secure scalable architecture." },
    ],
    live_url: "https://royal-ccrs.vercel.app/",
    completion_date: "2024",
    client: "Setup Studios",
    display_order: 2,
  },
];

function contentType(path) {
  return {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
  }[extname(path).toLowerCase()];
}

for (const project of projects) {
  const bytes = await readFile(join(process.cwd(), project.sourceImage));
  const extension = extname(project.sourceImage).toLowerCase();
  const coverPath = `migrated/${project.slug}/cover${extension}`;
  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(coverPath, bytes, {
      contentType: contentType(project.sourceImage),
      cacheControl: "31536000",
      upsert: true,
    });
  if (uploadError) throw uploadError;

  const { sourceImage: _sourceImage, ...projectData } = project;
  const { error: projectError } = await supabase.from("projects").upsert(
    {
      ...projectData,
      cover_image_path: coverPath,
      gallery_paths: [coverPath],
      is_published: true,
    },
    { onConflict: "slug" }
  );
  if (projectError) throw projectError;
  console.log(`Migrated ${project.title}`);
}

console.log("Project migration complete.");
