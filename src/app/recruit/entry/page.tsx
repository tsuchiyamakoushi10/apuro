import type { Metadata } from "next";
import { TelCard } from "@/components/Contact";
import { PageHeader, Section } from "@/components/Section";
import { SiteForm } from "@/components/SiteForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "採用応募・見学のお申し込み",
  description: `${site.name}の採用応募・見学のお申し込みはこちらから。まず話だけ聞いてみたい、事業所を見学してみたいという段階でも構いません。`,
  alternates: { canonical: "/recruit/entry" },
};

/**
 * 採用エントリー。送った内容はサーバからGoogleフォームへ入る（src/components/sendForm.ts）。
 * 導入の文はGoogleフォームの説明文と同じもの。
 */
export default function RecruitEntryPage() {
  return (
    <>
      <PageHeader eyebrow="Entry" title="採用応募・見学のお申し込み" />

      <Section>
        <div className="wrap grid grid-cols-[340px_1fr] gap-[72px] max-[960px]:grid-cols-1 max-[960px]:gap-12">
          <div>
            <p>「まず話だけ聞いてみたい」「事業所を見学してみたい」という段階でも構いません。履歴書のご用意も、この時点では必要ありません。</p>
            <p className="mt-5">必須はお名前とお電話番号の2つだけです。そのほかは、お答えいただける範囲で構いません。</p>
            <p className="mt-5">いただいたご連絡には、原則として当日中（営業時間外の場合は翌営業日の午前中）にご返信します。</p>
            <div className="mt-8">
              <TelCard label="お電話でのご相談" note={site.hours} />
            </div>
          </div>

          <div className="max-w-[640px]">
            <SiteForm id="recruit" />
          </div>
        </div>
      </Section>
    </>
  );
}
