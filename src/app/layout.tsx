import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd, { organizationJsonLd, websiteJsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "3M - Business Website",
    template: "%s | 3M",
  },
  description: "3M company - delivering innovative business solutions and projects worldwide.",
  keywords: ["business", "projects", "solutions", "3M", "company"],
  authors: [{ name: "3M" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "3M",
    title: "3M - Business Website",
    description: "3M company - delivering innovative business solutions and projects worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "3M - Business Website",
    description: "3M company - delivering innovative business solutions and projects worldwide.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
