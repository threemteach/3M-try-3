import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How 3M tech handles information submitted through this website.",
  alternates: localizedAlternates("/privacy"),
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#f5f2f3] px-4 py-24 text-[#312354] sm:px-8">
      <article className="mx-auto max-w-[780px] rounded-[28px] bg-white p-7 sm:p-12">
        <h1 className="text-[52px] leading-none [font-family:MedulaOne] sm:text-[68px]">Privacy Policy</h1>
        <p className="mt-6 leading-8 text-[#696175]">
          3M tech only uses information you submit through the project form to
          understand your enquiry and contact you about that project. The form
          opens your email or WhatsApp application; this website does not store
          the submitted message in a database.
        </p>
        <h2 className="mt-8 text-xl font-bold">Information you provide</h2>
        <p className="mt-3 leading-8 text-[#696175]">
          This may include your name, email address, phone number, and project
          details. Your chosen email or messaging provider may process that
          information under its own privacy terms.
        </p>
        <h2 className="mt-8 text-xl font-bold">Contact</h2>
        <p className="mt-3 leading-8 text-[#696175]">
          Questions about privacy can be sent to contact@3mtechs.com.
        </p>
      </article>
    </main>
  );
}
