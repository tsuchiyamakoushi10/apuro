import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Search Console に送信するサイトマップ。ページを増やしたらここにも足す */
const paths = ["/", "/about", "/service", "/recruit", "/privacy"] as const;

const priority: Record<(typeof paths)[number], number> = {
  "/": 1,
  "/about": 0.8,
  "/service": 0.8,
  "/recruit": 0.8,
  "/privacy": 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: priority[path],
  }));
}
