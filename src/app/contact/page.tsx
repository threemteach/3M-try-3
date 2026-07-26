import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with 3M tech for your next project.",
};

export default function ContactPage() {
  return (
    <section className="relative isolate flex min-h-[500px] items-center overflow-hidden bg-[#302451] px-4 pb-20 pt-28 text-center text-white sm:px-8 sm:pt-40">
      <Navbar />
      <Image
        src="/rectangles.png"
        alt=""
        width={850}
        height={600}
        className="pointer-events-none absolute right-[-90px] top-0 -z-10 h-auto w-[560px] opacity-40"
        priority
      />
      <div className="mx-auto max-w-[800px]">
        <h1 className="text-[58px] leading-[.92] [font-family:MedulaOne] sm:text-[84px]">
          Let&apos;s Build Something Great
        </h1>
        <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-8 text-white/75 sm:text-lg">
          Tell us what you want to build. The project form below can open your
          message in email or WhatsApp with all the details ready to send.
        </p>
        <Link
          href="#contact-form"
          className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-bold text-[#302451]"
        >
          Start Your Project
        </Link>
      </div>
    </section>
  );
}
