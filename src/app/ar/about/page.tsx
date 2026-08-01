import type { Metadata } from "next";
import About from "@/app/about/page";
import { ARABIC_KEYWORDS, arabicAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "عن 3M tech وفريق تطوير المنتجات الرقمية",
  description: "تعرّف على فريق 3M tech في مصر ومنهجنا في تصميم وتطوير منتجات رقمية مدروسة وقابلة للنمو.",
  keywords: ["شركة برمجة في مصر", "فريق تطوير مواقع", "استوديو منتجات رقمية", ...ARABIC_KEYWORDS.slice(7, 10)],
  alternates: arabicAlternates("/about"),
};

export default About;
