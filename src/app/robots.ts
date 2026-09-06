import type { MetadataRoute } from "next";
import { published, site } from "@/config/site";

/** 公開前は全面 Disallow。site.ts の published を true にすると解除される */
export default function robots(): MetadataRoute.Robots {
  if (!published) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
