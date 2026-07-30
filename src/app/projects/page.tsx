import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getPublishedProjects } from "@/lib/projects";
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
    description:
      "Explore custom web applications, e-commerce platforms, and digital products built by 3M tech.",
  },
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  return (
    <div className="min-h-screen overflow-hidden bg-[#f3f0f3]">
      <header className="relative overflow-hidden bg-[#302451] px-4 pb-24 pt-6 text-white sm:pb-32 sm:pt-10 lg:pb-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-16 h-[420px] w-[620px] opacity-25 sm:h-[560px] sm:w-[820px]"
        >
          <Image
            src="/rectangles.png"
            alt=""
            fill
            className="object-contain object-right-top"
            priority
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-white/10 blur-2xl sm:h-96 sm:w-96"
        />

        <Navbar />

        <div className="relative z-50 mb-8 flex w-full items-center justify-between px-2 pt-2 sm:hidden">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="3M Logo"
              width={80}
              height={50}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <Link
            href="/contact"
            className="flex h-8 items-center justify-center rounded-full bg-white px-5 text-xs font-bold text-[#302451] shadow-md"
          >
            Contact
          </Link>
        </div>

        <div className="projects-page-hero relative z-10 mx-auto max-w-[900px] pb-2 pt-8 text-center sm:pt-20">
          <div className="mb-4 flex items-center justify-center gap-4 sm:gap-6">
            <span className="h-[2px] w-12 bg-white/80 sm:w-24" />
            <h1
              style={{ fontFamily: '"MedulaOne", serif' }}
              className="text-[56px] font-normal leading-none sm:text-[80px] lg:text-[96px]"
            >
              Our Projects
            </h1>
            <span className="h-[2px] w-12 bg-white/80 sm:w-24" />
          </div>
          <p
            style={{ fontFamily: '"Cairo", sans-serif' }}
            className="mx-auto max-w-[720px] text-sm font-semibold leading-7 text-white/80 sm:text-xl"
          >
            The complete collection of products we&apos;ve designed and built
            for our clients.
          </p>
        </div>
      </header>

      <section
        aria-labelledby="projects-grid-title"
        className="relative z-20 mx-auto -mt-14 w-full max-w-[1440px] px-4 pb-24 sm:-mt-20 sm:px-7 lg:-mt-24 lg:px-10"
      >
        <h2 id="projects-grid-title" className="sr-only">
          All featured projects
        </h2>

        <div className="grid grid-cols-1 items-start gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group relative mx-auto aspect-[590/799] w-full max-w-[480px] overflow-hidden rounded-[24px] border border-white/90 bg-white/30 shadow-[0_22px_55px_rgba(48,36,81,.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(48,36,81,.27)]"
            >
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`View ${project.title} project`}
                className="absolute inset-0 block overflow-hidden rounded-[inherit]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={index < 3}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  style={{ objectPosition: "58% top" }}
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 48vw, 31vw"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/15"
                />

                <div className="project-card-category absolute inset-x-0 top-0 z-[2] flex justify-start px-4 pt-4 sm:px-5 sm:pt-5">
                  <span
                    style={{ fontFamily: '"Cairo", sans-serif' }}
                    className="max-w-full truncate rounded-full border border-white/85 bg-white/78 px-4 py-2 text-[9px] font-bold uppercase tracking-[.09em] text-[#302451] shadow-[0_8px_24px_rgba(48,36,81,.16),inset_0_1px_0_rgba(255,255,255,.95)] sm:px-5 sm:text-[10px] backdrop-blur-md"
                  >
                    {project.category}
                  </span>
                </div>

                <div className="project-card-copy absolute inset-x-0 bottom-0 flex min-h-[40%] flex-col justify-end px-5 pb-5 pt-20 text-left sm:px-6 sm:pb-6">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 border-t border-white/35 bg-gradient-to-b from-white/0 via-white/82 to-white/95 backdrop-blur-[2px]"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.2) 15%, black 42%)",
                      maskImage:
                        "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.2) 15%, black 42%)",
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-end gap-3">
                      <h3
                        style={{ fontFamily: '"MedulaOne", serif' }}
                        data-preserve-font="true"
                        className="min-w-0 flex-1 text-[42px] font-normal leading-[.95] text-[#302451] sm:text-[48px] lg:text-[clamp(38px,3.4vw,52px)]"
                      >
                        {project.title}
                      </h3>
                      <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] border border-[#302451]/60 text-[#302451] transition-colors group-hover:bg-[#302451] group-hover:text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                      </span>
                    </div>

                    <span className="my-2.5 block h-px w-full bg-gradient-to-r from-[#302451]/60 to-transparent" />

                    <p
                      style={{ fontFamily: '"Cairo", sans-serif' }}
                      className="line-clamp-2 min-h-[2.9em] text-[10px] font-medium leading-[1.45] text-[#504961] sm:text-[11px] lg:text-[clamp(10px,.78vw,12px)]"
                    >
                      {project.description}
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-2 overflow-hidden">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{ fontFamily: '"Cairo", sans-serif' }}
                          className="shrink-0 whitespace-nowrap rounded-full bg-[#302451] px-3.5 py-1.5 text-[10px] font-bold leading-none text-white shadow-[0_3px_10px_rgba(48,36,81,.25)] sm:px-4 sm:py-2 sm:text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
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
