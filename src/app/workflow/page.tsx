import Workflow from "@/components/Workflow";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { localizedAlternates } from "@/lib/seo";
import HeroLogoBackground from "@/components/HeroLogoBackground";

export const metadata: Metadata = {
  title: "Our Web Design & Development Process",
  description:
    "See how 3M tech combines creativity, strategy, and technology to deliver software solutions that drive measurable results.",
  alternates: localizedAlternates("/workflow"),
  openGraph: {
    title: "Web Design & Development Process | 3M tech",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/workflow`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function WorkflowPage() {
  return (
    <>
      <section className="relative isolate w-full overflow-hidden bg-[#302451] px-5 pb-0 pt-24 text-white sm:pt-36">
        <HeroLogoBackground />
        <div className="hidden">
          <Image
            src="/rectangles.png"
            alt=""
            width={850}
            height={600}
            className="h-auto w-[250px] sm:w-[350px] md:w-[480px] lg:w-[680px] xl:w-[820px] object-contain translate-x-8 sm:translate-x-0"
          />
        </div>
        <Navbar />
        <div className="relative z-10 mx-auto flex max-w-[1120px] justify-center">
          <h1 className="absolute inset-x-[14%] top-[25%] z-10 sm:inset-x-[12%]">
            <span className="sr-only">Our Process</span>
            <Image src="/process-title.svg" alt="" aria-hidden="true" width={138.47} height={20.3} sizes="(max-width: 639px) 72vw, 76vw" className="h-auto w-full" priority />
          </h1>
          <Image src="/projects-hero-character.png" alt="3M tech character" width={566} height={918} sizes="(max-width: 639px) 200px, 280px" className="relative z-20 h-[280px] w-auto object-contain object-bottom sm:h-[370px]" priority />
        </div>
      </section>
      <Workflow />
    </>
  );
}
