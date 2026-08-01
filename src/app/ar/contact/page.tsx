import type { Metadata } from "next";
import Contact from "@/app/contact/page";
import { arabicAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "تواصل مع شركة 3M tech لبدء مشروعك",
  description: "ابدأ مشروع موقع أو تطبيق ويب أو متجر إلكتروني مع فريق 3M tech في مصر عبر واتساب.",
  keywords: ["طلب تصميم موقع", "التواصل مع شركة برمجة", "سعر تصميم موقع في مصر", "بدء مشروع برمجي"],
  alternates: arabicAlternates("/contact"),
};

export default Contact;
