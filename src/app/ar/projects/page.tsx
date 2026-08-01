import type { Metadata } from "next";
import Projects from "@/app/projects/page";
import { ARABIC_KEYWORDS, arabicAlternates } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "أعمالنا في تصميم وتطوير المواقع والتطبيقات",
  description: "استكشف مشاريع 3M tech في تطبيقات الويب والمتاجر الإلكترونية والمنصات الرقمية وتجارب UI/UX.",
  keywords: ["سابقة أعمال برمجة", "مشاريع تصميم مواقع", "نماذج متاجر إلكترونية", ...ARABIC_KEYWORDS.slice(2, 9)],
  alternates: arabicAlternates("/projects"),
};

export default Projects;
