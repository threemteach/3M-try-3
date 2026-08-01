import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { KEYWORD_CLUSTERS, localizedAlternates } from "@/lib/seo";
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
  const copy = service.en;
  const url = `${SITE_URL}/services/${service.slug}`;
  const keywords = [...KEYWORD_CLUSTERS[service.keywordCluster].en];

  return {
    title: { absolute: `${copy.seoTitle} | ${SITE_NAME}` },
    description: copy.description,
    keywords,
    alternates: localizedAlternates(`/services/${service.slug}`),
    openGraph: {
      title: `${copy.seoTitle} | ${SITE_NAME}`,
      description: copy.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${copy.seoTitle} | ${SITE_NAME}`,
      description: copy.description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceLandingPage service={service} isArabic={false} />;
}
