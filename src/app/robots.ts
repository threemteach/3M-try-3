import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/login", "/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot"],
        allow: "/",
        disallow: ["/admin/", "/login", "/api/"],
      },
    ],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
