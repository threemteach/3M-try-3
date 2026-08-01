import type { Metadata } from "next";
import Home from "@/app/page";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ARABIC_KEYWORDS, arabicAlternates } from "@/lib/seo";

const description =
  "3M tech شركة برمجة وتصميم منتجات رقمية، نطوّر المواقع وتجارب UI/UX والمتاجر الإلكترونية والحلول الرقمية والمنصات التعليمية للشركات في مصر ودول الخليج.";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "شركة برمجة وتصميم مواقع في مصر والخليج | 3M tech" },
  description,
  keywords: [...ARABIC_KEYWORDS, "3M tech"],
  alternates: arabicAlternates("/"),
  openGraph: {
    title: "شركة برمجة وتصميم مواقع في مصر والخليج | 3M tech",
    description,
    url: `${SITE_URL}/ar`,
    siteName: SITE_NAME,
    locale: "ar_EG",
    type: "website",
  },
  twitter: { card: "summary", title: "شركة برمجة وتصميم مواقع في مصر والخليج | 3M tech", description },
};

export default Home;
