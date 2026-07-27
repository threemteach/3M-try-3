import type { Metadata } from "next";
import "./globals.css";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ScrollToTop from "@/components/ScrollToTop";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  title: {
    default: "3M tech | Digital Product Studio in Egypt",
    template: "%s | 3M tech",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  keywords: [
    "web development Egypt",
    "digital product studio Egypt",
    "custom web applications",
    "e-commerce development Egypt",
    "Shopify development Egypt",
    "MVP development",
    "UI UX design Egypt",
    "web development Middle East",
    "3M tech",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: "3M tech | Digital Product Studio in Egypt",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "3M tech | Digital Product Studio in Egypt",
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
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "3M Tech",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "EG",
  },
  areaServed: [
    { "@type": "Country", name: "Egypt" },
    { "@type": "Place", name: "Middle East" },
  ],
  sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Product Services",
    itemListElement: [
      "Custom Web Applications",
      "E-Commerce Platforms",
      "Shopify Store Setup",
      "MVP Development",
      "UI/UX Design",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-[family-name:var(--font-cairo)] antialiased">
        <ScrollToTop />
        <main className="flex-1">{children}</main>
        <ContactForm />
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
