import type { Metadata } from "next";
import Terms from "@/app/terms/page";
import { arabicAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "شروط الاستخدام",
  description: "شروط استخدام موقع وخدمات 3M tech.",
  alternates: arabicAlternates("/terms"),
};

export default Terms;
