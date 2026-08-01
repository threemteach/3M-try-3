import type { Metadata } from "next";
import "./globals.css";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";
import PublicSiteChrome from "@/components/PublicSiteChrome";
import ScrollReveal from "@/components/ScrollReveal";
import { LanguageProvider } from "@/components/LanguageProvider";
import MobileHeader from "@/components/MobileHeader";
import JsonLd from "@/components/JsonLd";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
} from "@/lib/constants";
import { ENGLISH_KEYWORDS, localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-48.png",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  title: {
    default: "Software, Web Development & UI/UX in Egypt & GCC | 3M tech",
    template: "%s | 3M tech",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [...ENGLISH_KEYWORDS, "3M tech"],
  alternates: localizedAlternates("/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: "Software, Web Development & UI/UX in Egypt & GCC | 3M tech",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "Software, Web Development & UI/UX in Egypt & GCC | 3M tech",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "3M Tech",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon-512.png`,
    contentUrl: `${SITE_URL}/favicon-512.png`,
    width: 512,
    height: 512,
  },
  description: SITE_DESCRIPTION,
  telephone: SITE_PHONE,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales and customer support",
    telephone: SITE_PHONE,
    availableLanguage: ["English", "Arabic"],
    areaServed: ["EG", "AE", "SA", "KW", "QA", "BH", "OM"],
  },
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "EG",
  },
  areaServed: [
    { "@type": "Country", name: "Egypt" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Oman" },
  ],
  sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
  knowsAbout: [
    "Web Development",
    "Custom Web Applications",
    "E-Commerce Development",
    "Shopify Development",
    "MVP Development",
    "UI/UX Design",
    "Digital Platform Development",
    "Educational Platform Development",
    "Learning Management Systems",
    "Digital Product Strategy",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Product Services",
    itemListElement: [
      "Custom Web Applications",
      "E-Commerce Platforms",
      "Shopify Store Setup",
      "MVP Development",
      "UI/UX Design",
      "Custom Digital Platforms",
      "Business Automation Systems",
      "Educational Platforms and LMS",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: ["3M Tech", "3M tech Egypt"],
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["en", "ar"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      </head>
      <body className="flex min-h-screen flex-col font-[family-name:var(--font-cairo)] antialiased">
        <LanguageProvider>
          <PublicSiteChrome>
            <LoadingScreen />
            <ScrollToTop />
            <MobileHeader />
          </PublicSiteChrome>
          <ScrollReveal />
          <main className="flex-1">{children}</main>
          <PublicSiteChrome>
            <ContactForm />
            <Footer />
            <MobileBottomNav />
          </PublicSiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
