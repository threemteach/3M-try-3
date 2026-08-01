import type { Metadata } from "next";
import Workflow from "@/app/workflow/page";
import { arabicAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "مراحل تصميم وتطوير المواقع والمنتجات الرقمية",
  description: "من البحث والاستراتيجية إلى UI/UX والتطوير والاختبار والإطلاق؛ تعرّف على طريقة عمل فريق 3M tech.",
  keywords: ["مراحل تصميم موقع", "مراحل تطوير تطبيق", "عملية UI UX", "اختبار وإطلاق المواقع"],
  alternates: arabicAlternates("/workflow"),
};

export default Workflow;
