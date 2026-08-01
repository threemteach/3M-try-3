import type { Metadata } from "next";
import Privacy from "@/app/privacy/page";
import { arabicAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية الخاصة بموقع 3M tech.",
  alternates: arabicAlternates("/privacy"),
};

export default Privacy;
