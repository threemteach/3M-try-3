import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with 3M for your next project.",
  openGraph: {
    title: "Contact Us | 3M",
    description: "Get in touch with 3M for your next project.",
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | 3M",
    description: "Get in touch with 3M for your next project.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f0edf5] flex flex-col items-center justify-center px-4 text-center">
      <h1
        style={{ fontFamily: '"MedulaOne", serif' }}
        className="text-4xl sm:text-5xl text-[#302451] mb-4"
      >
        Let&apos;s Work Together
      </h1>
      <p
        style={{ fontFamily: '"Cairo", sans-serif' }}
        className="text-gray-600 text-lg max-w-md mb-8"
      >
        Have a project in mind? Reach out and let&apos;s build something amazing.
      </p>
      <a
        href="mailto:info@3m.com"
        style={{ fontFamily: '"Cairo", sans-serif' }}
        className="h-12 px-8 rounded-full bg-[#302451] text-white font-bold text-sm flex items-center justify-center shadow-xl hover:bg-[#43346d] transition-all hover:scale-105 active:scale-95"
      >
        info@3m.com
      </a>
    </div>
  );
}
