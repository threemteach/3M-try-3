import HomeHero from "@/components/HomeHero";
import NextSection from "@/components/NextSection";
import Portfolio from "@/components/Portfolio";
import LogoWorkReveal from "@/components/LogoWorkReveal";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeAre from "@/components/WhoWeAre";
import StudioStatement from "@/components/StudioStatement";
import Workflow from "@/components/Workflow";
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { getPublishedProjects } from "@/lib/projects";
import { localizedAlternates } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Software, Web Development & UI/UX in Egypt & GCC | 3M tech" },
  description: SITE_DESCRIPTION,
  alternates: localizedAlternates("/"),
  openGraph: {
    title: "Software, Web Development & UI/UX in Egypt & GCC | 3M tech",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Software, Web Development & UI/UX in Egypt & GCC | 3M tech",
    description: SITE_DESCRIPTION,
  },
};

export default async function Home() {
  const projects = await getPublishedProjects();
  return (
    <>
      <HomeHero />

      <NextSection />

      {/* Portfolio / Our Work Section */}
      <LogoWorkReveal>
        <Portfolio projects={projects} />
      </LogoWorkReveal>

      {/* What We Do / Services Section */}
      <WhatWeDo />
      <WhoWeAre />
      <StudioStatement />
      <Workflow />

    </>
  );
}
