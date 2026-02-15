import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://motiondesk.app/sitemap.xml",
    host: "https://motiondesk.app",
  };
}
