import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getPublishedProjects } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { localizedAlternates } from "@/lib/seo";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Web Development Portfolio",
  description:
    "Explore custom web applications, e-commerce platforms, and digital products designed and developed by 3M tech.",
  alternates: localizedAlternates("/projects"),
  openGraph: {
    title: "Web Development Portfolio | 3M tech",
    description:
      "Explore custom web applications, e-commerce platforms, and digital products built by 3M tech.",
    url: `${SITE_URL}/projects`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Web Development Portfolio | 3M tech",
    description:
      "Explore custom web applications, e-commerce platforms, and digital products built by 3M tech.",
  },
};

export const revalidate = 60;

const heroStars = [
  { left: "1%", top: "14%", size: 52, opacity: 0.65, rotate: -8 },
  { left: "5%", top: "25%", size: 112, opacity: 0.72, rotate: 5 },
  { left: "14%", top: "10%", size: 38, opacity: 0.58, rotate: 12 },
  { left: "18%", top: "23%", size: 62, opacity: 0.62, rotate: -10 },
  { left: "26%", top: "9%", size: 74, opacity: 0.68, rotate: 8 },
  { left: "31%", top: "19%", size: 42, opacity: 0.5, rotate: -4 },
  { left: "37%", top: "8%", size: 34, opacity: 0.38, rotate: 6 },
  { left: "41%", top: "27%", size: 80, opacity: 0.62, rotate: -9 },
  { left: "48%", top: "14%", size: 42, opacity: 0.54, rotate: 8 },
  { left: "55%", top: "8%", size: 96, opacity: 0.7, rotate: -8 },
  { left: "61%", top: "24%", size: 44, opacity: 0.5, rotate: 10 },
  { left: "67%", top: "13%", size: 32, opacity: 0.45, rotate: -5 },
  { left: "72%", top: "22%", size: 92, opacity: 0.65, rotate: 7 },
  { left: "80%", top: "9%", size: 48, opacity: 0.58, rotate: -8 },
  { left: "87%", top: "19%", size: 78, opacity: 0.66, rotate: 6 },
  { left: "94%", top: "10%", size: 42, opacity: 0.52, rotate: -10 },
  { left: "3%", top: "42%", size: 45, opacity: 0.52, rotate: 8 },
  { left: "12%", top: "38%", size: 30, opacity: 0.48, rotate: -7 },
  { left: "23%", top: "36%", size: 62, opacity: 0.55, rotate: 7 },
  { left: "34%", top: "41%", size: 36, opacity: 0.42, rotate: -5 },
  { left: "51%", top: "35%", size: 52, opacity: 0.56, rotate: 10 },
  { left: "63%", top: "39%", size: 34, opacity: 0.45, rotate: -8 },
  { left: "76%", top: "37%", size: 54, opacity: 0.52, rotate: 7 },
  { left: "90%", top: "40%", size: 34, opacity: 0.46, rotate: -6 },
];

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  return (
    <div className="min-h-screen overflow-hidden bg-[#f3f0f3]">
      <header className="projects-hero-header relative isolate overflow-hidden bg-[#302451] px-4 pt-6 text-white sm:pt-10">
        <Navbar />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {heroStars.map((star, index) => (
            <Image
              key={index}
              src="/star-34.svg"
              alt=""
              width={star.size}
              height={star.size}
              className="absolute h-auto"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                opacity: star.opacity,
                transform: `rotate(${star.rotate}deg)`,
              }}
            />
          ))}
        </div>

        <div className="projects-page-hero absolute inset-0 z-10 mx-auto w-full max-w-[1920px] text-center">
          <h1 className="projects-hero-title absolute left-0 z-10 h-[1em] w-full [font-family:MedulaOne] font-normal leading-[0.78] text-white">
            <span className="sr-only">Our Projects</span>
            <span aria-hidden="true" className="relative block h-full w-full whitespace-nowrap">
              <span className="projects-hero-title-start absolute left-[12.1%] top-0">Our Pr</span>
              <span className="projects-hero-capsule absolute left-[52.1%] top-[0.05em] inline-block -translate-x-1/2 rounded-full border-[clamp(5px,0.65vw,12px)] border-white" />
              <span className="projects-hero-title-end absolute top-0">jects</span>
            </span>
          </h1>

          <div aria-hidden="true" className="projects-hero-tagline absolute left-[12.1%] z-[12] w-auto text-left [font-family:MedulaOne] leading-[0.92]">
            {[1, 0.72, 0.48, 0.28, 0.14].map((opacity, index) => (
              <p key={index} className="whitespace-nowrap" style={{ opacity }}>
                We make your Dream
              </p>
            ))}
          </div>

          <div className="projects-hero-character pointer-events-none absolute left-[52.1%] z-20 -translate-x-1/2">
            <Image
              src="/projects-hero-character.png"
              alt="3M tech character presenting our projects"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 639px) 315px, (max-width: 1023px) 400px, (max-width: 1279px) 468px, 512px"
              className="object-contain object-bottom drop-shadow-[0_22px_40px_rgba(8,4,22,.2)]"
            />
          </div>
        </div>

      </header>

      <section
        aria-labelledby="projects-grid-title"
        className="projects-grid-section relative z-20 mx-auto w-full max-w-[1440px] px-4 pb-24 sm:px-7 lg:px-10"
      >
        <h2 id="projects-grid-title" className="sr-only">
          All featured projects
        </h2>

        <div className="grid grid-cols-1 items-start gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full rounded-[28px] border border-dashed border-[#302451]/20 bg-white/60 px-6 py-20 text-center">
              <p className="text-lg font-bold text-[#302451]">New projects are coming soon.</p>
            </div>
          )}
        </div>

        <div className="mt-14 flex justify-center sm:mt-16">
          <Link
            href="/#portfolio"
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="group inline-flex h-13 items-center justify-center gap-3 rounded-full border border-white/30 bg-[#302451] px-8 text-sm font-bold text-white shadow-[0_12px_30px_rgba(48,36,81,.22)] transition-all hover:-translate-y-0.5 hover:bg-[#43346d] sm:h-14 sm:text-base"
          >
            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></span>
            <span>Back to Home</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
