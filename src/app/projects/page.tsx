import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { projectsData } from "@/lib/projectsData";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Web Development Portfolio",
  description:
    "Explore custom web applications, e-commerce platforms, and digital products designed and developed by 3M tech.",
  alternates: { canonical: "/projects" },
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
    description: "Explore custom web applications, e-commerce platforms, and digital products built by 3M tech.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6e1e6] via-[#eae5ee] to-[#ded9e6] flex flex-col justify-between">
      {/* Header Section */}
      <div className="relative bg-[#302451] pt-6 sm:pt-10 pb-16 sm:pb-24 px-4 overflow-hidden">
        {/* Background Rectangles Pattern */}
        <div className="absolute right-0 top-0 z-0 pointer-events-none opacity-30">
          <Image
            src="/rectangles.png"
            alt=""
            width={700}
            height={500}
            className="h-auto w-[400px] sm:w-[600px] object-contain"
          />
        </div>

        {/* Desktop Navbar */}
        <Navbar />

        {/* Mobile Header Bar */}
        <div className="relative z-50 flex items-center justify-between px-2 pt-2 sm:hidden w-full mb-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="3M Logo"
              width={80}
              height={50}
              className="h-[32px] w-auto object-contain"
              priority
            />
          </Link>
          <Link
            href="/contact"
            className="flex h-[32px] items-center justify-center whitespace-nowrap rounded-[150px] bg-white px-5 text-[12px] font-bold text-[#302451] shadow-md"
          >
            Contact
          </Link>
        </div>

        {/* Hero Title */}
        <div className="relative z-10 max-w-[1280px] mx-auto pt-10 sm:pt-24 text-center text-white">
          <h1
            style={{ fontFamily: '"MedulaOne", serif' }}
            className="text-[52px] sm:text-[76px] lg:text-[96px] font-normal leading-none mb-3"
          >
            All Featured Projects
          </h1>
          <p
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="text-base sm:text-xl text-purple-100 max-w-[700px] mx-auto font-semibold px-2"
          >
            Explore our complete portfolio of web applications, platforms, and digital experiences.
          </p>
        </div>
      </div>

      {/* Main Content Area: Cards Grid */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 -mt-10 sm:-mt-16 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {projectsData.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group relative flex flex-col bg-white/95 backdrop-blur-sm rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/60 text-left"
            >
              {/* Preview Image */}
              <div className="relative w-full aspect-[16/11] bg-[#ded9e6] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#302451]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-semibold bg-[#302451]/90 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                    View Project Case Study ↗
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <span className="inline-block text-[11px] font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="text-xl sm:text-2xl font-bold text-[#302451] mb-2 leading-tight flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <span className="text-xs font-semibold text-[#302451] bg-purple-50 px-2.5 py-1 rounded-full group-hover:bg-[#302451] group-hover:text-white transition-colors duration-200">
                      View ↗
                    </span>
                  </h3>
                  <p
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3"
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{ fontFamily: '"Cairo", sans-serif' }}
                      className="px-3 py-1 rounded-full bg-[#302451] text-white text-[11px] font-semibold whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-14 text-center">
          <Link
            href="/"
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-[#302451] text-white font-bold text-sm shadow-xl hover:bg-[#43346d] transition-all hover:scale-105 active:scale-95"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
