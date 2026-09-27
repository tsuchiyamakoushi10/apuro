import type { MetadataRoute } from "next";
import { published, site } from "@/config/site";

/**
 * 公開前は全面 Disallow。site.ts の published を true にすると解除される。
 *
 * 公開後は User-agent: * の1本だけで、**AIのクローラも含めて全部許可する**
 * （クライアント判断）。GPTBot・ClaudeBot・PerplexityBot・CCBot・Google-Extended・
 * Applebot-Extended などを個別に拒否しない。載せている内容は公開情報で、
 * ChatGPTやPerplexityの回答から地域の相談につながる経路のほうが大きいため。
 * **方針を変えるときはここに Disallow を足す。**除外したいクローラ名を
 * userAgent ごとの rule として並べる（MetadataRoute.Robots は配列も取れる）
 */
export default function robots(): MetadataRoute.Robots {
  if (!published) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
