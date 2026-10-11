import type { Metadata } from "next";
import { TelCard } from "@/components/Contact";
import { PageHeader, Section } from "@/components/Section";
import { SiteForm } from "@/components/SiteForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `訪問看護のご利用に関するご相談、${site.name}へのお問い合わせはこちらから。対応エリアは${site.areas.join("・")}です。`,
  alternates: { canonical: "/contact" },
};

/**
 * お問い合わせ。送った内容はサーバからGoogleフォームへ入る（src/components/sendForm.ts）。
 * 導入の文はGoogleフォームの説明文と同じもの。
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="ご相談・お問い合わせ" />

      <Section>
        <div className="wrap grid grid-cols-[340px_1fr] gap-[72px] max-[960px]:grid-cols-1 max-[960px]:gap-12">
          <div>
            <p>訪問看護のご利用に関するご相談、事業所へのお問い合わせはこちらからお願いします。</p>
            <p className="mt-5">
              対応エリア：{site.areas.join("・")}（その他の地域もご相談ください）
            </p>
            <p className="mt-5">「対応してもらえるか分からない」という段階のご相談も歓迎しています。</p>
            <div className="mt-8">
              <TelCard label="お電話でのご相談" note={`${site.hours}／${site.oncall}`} />
            </div>
          </div>

          <div className="max-w-[640px]">
            <SiteForm id="contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
