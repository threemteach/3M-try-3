import type { Metadata } from "next";
import "./globals.css";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  title: {
    default: "3M tech",
    template: "%s | 3M tech",
  },
  description:
    "3M tech builds custom web applications, e-commerce platforms, MVPs, and digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
