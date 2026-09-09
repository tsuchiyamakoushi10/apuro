import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/Section";
import { Paragraphs } from "@/components/ui";
import { news } from "@/content/news";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "お知らせ",
  description: `${site.name}からのお知らせです。営業時間の変更や、地域の方へのご案内などを掲載します。`,
};

/** 2026-09-09 → 2026年9月9日。桁を揃えないのは、日本語の日付は詰めて書くため */
function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
}

export default function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="News" title="お知らせ" />

      <Section>
        <div className="wrap">
          {news.length === 0 ? (
            <p className="text-ink-muted">現在お知らせはありません。</p>
          ) : (
            <div className="border-t border-blue-soft">
              {news.map((item) => (
                <article
                  key={`${item.date}-${item.title}`}
                  className="reveal grid grid-cols-[160px_1fr] items-baseline gap-x-10 border-b border-blue-soft py-9 max-[960px]:grid-cols-1 max-[960px]:gap-y-2 max-[960px]:py-7"
                >
                  <time dateTime={item.date} className="font-en text-[0.875rem] tracking-[0.08em] text-blue">
                    {formatDate(item.date)}
                  </time>
                  <div>
                    <h2 className="text-[1.1875rem]">{item.title}</h2>
                    <Paragraphs text={item.body} className="mt-3 text-[0.9375rem]" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
