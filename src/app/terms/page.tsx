import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the 3M tech website and requesting project services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="bg-[#f5f2f3] px-4 py-24 text-[#312354] sm:px-8">
      <article className="mx-auto max-w-[780px] rounded-[28px] bg-white p-7 sm:p-12">
        <h1 className="text-[52px] leading-none [font-family:MedulaOne] sm:text-[68px]">Terms of Use</h1>
        <p className="mt-6 leading-8 text-[#696175]">
          The information on this website describes 3M tech&apos;s services and
          selected work. Project timelines and pricing are estimates until both
          parties agree to a written scope, schedule, and commercial proposal.
        </p>
        <h2 className="mt-8 text-xl font-bold">Website content</h2>
        <p className="mt-3 leading-8 text-[#696175]">
          Site content may be updated as services and projects evolve. Client
          work, names, and third-party marks remain the property of their
          respective owners.
        </p>
        <h2 className="mt-8 text-xl font-bold">Project enquiries</h2>
        <p className="mt-3 leading-8 text-[#696175]">
          Sending an enquiry does not create a service agreement. Work begins
          only after scope, responsibilities, payment terms, and delivery terms
          are confirmed.
        </p>
      </article>
    </main>
  );
}
