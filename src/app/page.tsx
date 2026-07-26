import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import RotatingSpinner from "@/components/RotatingSpinner";
import NextSection from "@/components/NextSection";
import Portfolio from "@/components/Portfolio";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeAre from "@/components/WhoWeAre";
import Workflow from "@/components/Workflow";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[560px] sm:min-h-[620px] md:min-h-[700px] lg:min-h-[820px] xl:min-h-[880px] w-full overflow-hidden bg-[#302451] flex flex-col justify-start pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-14 lg:pb-20">
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
        <div className="relative z-50 flex items-center justify-between px-5 pt-2 sm:hidden w-full">
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
            className="flex h-[32px] items-center justify-center whitespace-nowrap rounded-[150px] bg-white/20 px-5 text-[12px] font-bold text-white backdrop-blur-md"
          >
            Contact
          </Link>
        </div>

        {/* Desktop / Tablet Glassmorphism Navbar */}
        <Navbar />

        {/* Main Hero Content */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto my-auto px-4 sm:px-8 md:px-12 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-20 2xl:pl-20 2xl:pr-24 pt-6 sm:pt-10 md:pt-12 lg:pt-28 xl:pt-32">
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[680px] xl:max-w-[780px] 2xl:max-w-[880px]">
            
            {/* Title */}
            <h1
              style={{ fontFamily: '"MedulaOne", serif' }}
              className="text-[48px] xs:text-[54px] sm:text-[52px] md:text-[68px] lg:text-[108px] xl:text-[128px] 2xl:text-[142px] font-normal leading-[0.92] text-white tracking-tight w-full"
            >
              Where Ambition<br />Meets Engineering
            </h1>

            {/* Spinner */}
            <div className="mt-2 sm:mt-3 lg:mt-4 w-full flex justify-center sm:justify-start">
              <RotatingSpinner />
            </div>

            {/* Buttons (Tablet & Desktop: sm:flex, hidden on mobile) */}
            <div className="mt-5 hidden sm:flex items-center gap-0 lg:mt-8">
              <a
                href="#work"
                className="flex h-[42px] w-[130px] md:h-[48px] md:w-[155px] lg:h-[56px] lg:w-[185px] items-center justify-center rounded-l-[9999px] border-2 border-white bg-transparent text-[12px] md:text-[14px] lg:text-[17px] font-semibold text-white transition-colors hover:bg-white/15"
                style={{ fontFamily: '"Cairo", sans-serif' }}
              >
                See Our Work
              </a>
              <a
                href="#contact"
                className="flex h-[42px] w-[130px] md:h-[48px] md:w-[155px] lg:h-[56px] lg:w-[185px] items-center justify-center rounded-r-[9999px] border-2 border-white bg-white text-[12px] md:text-[14px] lg:text-[17px] font-semibold text-[#302451] transition-colors hover:bg-[#f0edf5]"
                style={{ fontFamily: '"Cairo", sans-serif' }}
              >
                Get a free quote
              </a>
            </div>

          </div>

          {/* Mockup Image - Desktop & Tablet (absolute, right side for >= sm) */}
          <div className="hidden sm:block absolute right-0 sm:right-2 md:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-[45%] z-[1] pointer-events-none">
            <Image
               src="/mockup.png"
              alt="3M Portfolio Showcase"
              width={1150}
              height={700}
              className="h-auto w-[310px] md:w-[420px] lg:w-[520px] xl:w-[650px] 2xl:w-[780px] max-w-none object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Mockup Image - Mobile (< sm) */}
          <div className="flex justify-center sm:hidden mt-2 translate-x-3">
            <Image
               src="/mockup.png"
              alt="3M Portfolio Showcase"
              width={1150}
              height={700}
              className="h-auto w-[380px] max-w-[108%] object-contain drop-shadow-2xl"
              priority
            />
          </div>

        </div>

      </section>

      {/* Curved Transition & Dream It Section */}
      <NextSection />

      {/* Portfolio / Our Work Section */}
      <Portfolio />

      {/* What We Do / Services Section */}
      <WhatWeDo />

      {/* Who We Are Section */}
      <WhoWeAre />

      <Workflow />

    </>
  );
}
