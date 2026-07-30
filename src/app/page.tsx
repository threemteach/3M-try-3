import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import RotatingSpinner from "@/components/RotatingSpinner";
import NextSection from "@/components/NextSection";
import Portfolio from "@/components/Portfolio";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeAre from "@/components/WhoWeAre";
import Workflow from "@/components/Workflow";
import { LanguageToggle } from "@/components/LanguageProvider";
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "3M tech | Digital Product Studio in Egypt" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "3M tech | Digital Product Studio in Egypt",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "3M tech | Digital Product Studio in Egypt",
    description: SITE_DESCRIPTION,
  },
};

export default async function Home() {
  const projects = await getPublishedProjects();
  return (
    <>
      <section className="relative flex min-h-[650px] w-full flex-col justify-start overflow-hidden bg-[#302451] pb-24 pt-4 sm:min-h-[760px] sm:pb-20 sm:pt-6 md:min-h-[820px] lg:min-h-[820px] lg:pb-20 lg:pt-8 xl:min-h-[880px]">
        {/* Background Decorative Pattern (Made smaller) */}
        <div className="absolute right-0 top-0 z-0 pointer-events-none overflow-hidden opacity-40 md:opacity-70 lg:opacity-100">
          <Image
            src="/rectangles.png"
            alt=""
            width={850}
            height={600}
            className="h-auto w-[250px] sm:w-[350px] md:w-[480px] lg:w-[680px] xl:w-[820px] object-contain translate-x-8 sm:translate-x-0"
            priority
          />
        </div>

        {/* Mobile Header Bar */}
        <div dir="ltr" className="relative z-50 flex w-full items-center justify-between px-5 pt-2 sm:hidden">
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
          <div dir="ltr" className="flex shrink-0 items-center gap-2">
            <LanguageToggle compact />
            <Link
              href="/contact"
              className="flex h-[32px] w-[94px] items-center justify-center whitespace-nowrap rounded-[150px] bg-white px-2 text-[11px] font-bold text-[#302451] shadow-md"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Desktop / Tablet Glassmorphism Navbar */}
        <Navbar />

        {/* Main Hero Content */}
        <div className="relative z-10 mx-auto my-auto w-full max-w-[1600px] px-4 pt-5 sm:px-8 sm:pt-20 md:px-12 md:pt-24 lg:pl-12 lg:pr-16 lg:pt-28 xl:pl-16 xl:pr-20 xl:pt-32 2xl:pl-20 2xl:pr-24">
          
          <div className="rtl-hero-copy relative z-[2] mx-auto flex w-full max-w-[340px] flex-col items-center text-center sm:max-w-[560px] md:max-w-[680px] lg:mx-0 lg:max-w-[680px] lg:items-start lg:text-left xl:max-w-[780px] 2xl:max-w-[880px]">
            
            {/* Title */}
            <h1
              style={{ fontFamily: '"MedulaOne", serif' }}
              className="w-full text-[46px] font-normal leading-[0.94] tracking-tight text-white min-[390px]:text-[50px] sm:text-[62px] md:text-[76px] lg:text-[118px] lg:leading-[0.9] xl:text-[140px] 2xl:text-[154px]"
            >
              Where Ambition<br />Meets Engineering
            </h1>

            {/* Spinner */}
            <div className="mt-1 flex w-full justify-center sm:mt-2 lg:mt-4 lg:justify-start">
              <RotatingSpinner />
            </div>

            {/* Buttons (Tablet & Desktop: sm:flex, hidden on mobile) */}
            <div className="hero-actions mt-8 hidden items-center gap-0 lg:flex">
              <a
                href="#work"
                className="flex h-[42px] w-[130px] md:h-[48px] md:w-[155px] lg:h-[56px] lg:w-[185px] items-center justify-center rounded-l-[9999px] border-2 border-white bg-transparent text-[12px] md:text-[14px] lg:text-[17px] font-semibold text-white transition-colors hover:bg-white/15"
                style={{ fontFamily: '"Cairo", sans-serif' }}
              >
                See Our Work
              </a>
              <a
                href="#contact-form"
                className="flex h-[42px] w-[130px] md:h-[48px] md:w-[155px] lg:h-[56px] lg:w-[185px] items-center justify-center rounded-r-[9999px] border-2 border-white bg-white text-[12px] md:text-[14px] lg:text-[17px] font-semibold text-[#302451] transition-colors hover:bg-[#f0edf5]"
                style={{ fontFamily: '"Cairo", sans-serif' }}
              >
                Get a free quote
              </a>
            </div>

          </div>

          {/* Mockup Image - Desktop (absolute, right side for >= lg) */}
          <div className="hero-mockup-desktop pointer-events-none absolute right-0 top-1/2 z-[1] hidden -translate-y-[45%] lg:right-6 lg:block xl:right-8">
            <Image
               src="/mockup.png"
              alt="3M Portfolio Showcase"
              width={1150}
              height={700}
              className="h-auto w-[310px] md:w-[420px] lg:w-[520px] xl:w-[650px] 2xl:w-[780px] max-w-none object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Mockup Image - Mobile & Tablet (< lg) */}
          <div className="mt-0 flex translate-x-2 justify-center sm:mt-2 md:mt-4 lg:hidden">
            <Image
               src="/mockup.png"
              alt="3M Portfolio Showcase"
              width={1150}
              height={700}
              className="h-auto w-[390px] max-w-[116%] object-contain drop-shadow-2xl sm:w-[620px] sm:max-w-[112%] md:w-[760px] md:max-w-[110%]"
              priority
            />
          </div>

        </div>

      </section>

      {/* Curved Transition & Dream It Section */}
      <NextSection />

      {/* Portfolio / Our Work Section */}
      <Portfolio projects={projects} />

      {/* What We Do / Services Section */}
      <WhatWeDo />

      {/* Who We Are Section */}
      <WhoWeAre />

      <Workflow />

    </>
  );
}
