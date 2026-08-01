import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { arabicAlternates, KEYWORD_CLUSTERS } from "@/lib/seo";
import { getService, serviceSlugs } from "@/lib/serviceData";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const copy = service.ar;
  const url = `${SITE_URL}/ar/services/${service.slug}`;
  const keywords = [...KEYWORD_CLUSTERS[service.keywordCluster].ar];

  return {
    title: { absolute: `${copy.seoTitle} | ${SITE_NAME}` },
    description: copy.description,
    keywords,
    alternates: arabicAlternates(`/services/${service.slug}`),
    openGraph: {
      title: `${copy.seoTitle} | ${SITE_NAME}`,
      description: copy.description,
      url,
      siteName: SITE_NAME,
      locale: "ar_AR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${copy.seoTitle} | ${SITE_NAME}`,
      description: copy.description,
    },
  };
}

export default async function ArabicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceLandingPage service={service} isArabic />;
}
