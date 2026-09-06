import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/Section";
import { Paragraphs, Tbd } from "@/components/ui";
import { site } from "@/config/site";
import { sections } from "@/content/privacy";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "アプロ訪問看護ステーションにおける個人情報の取得目的、利用範囲、第三者提供、外部サービスの利用、開示請求の窓口について。",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy policy" title="プライバシーポリシー" />

      <Section>
        <div className="wrap">
          <p>
            {site.company}（{site.name}）は、訪問看護のご提供および採用活動にあたり、
            ご本人およびご家族の個人情報をお預かりします。個人情報の保護に関する法律その他の法令を遵守し、
            以下のとおり取り扱います。
          </p>

          <div className="mt-14 grid gap-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[1.3125rem]">{section.heading}</h2>
                <div className="mt-4">
                  <Paragraphs text={section.body} className="text-[0.875rem]" />
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-[1.3125rem]">9. お問い合わせ窓口</h2>
              <div className="mt-4 rounded-card bg-mist p-8 text-[0.875rem] max-[960px]:p-6">
                <p>
                  <span className="block">{site.name}　個人情報保護担当</span>
                  <span className="block">運営：{site.company}</span>
                  <span className="block">
                    <Tbd value={site.address} />
                  </span>
                  <span className="block">
                    TEL <a href={site.telHref}>{site.tel}</a>（{site.hours}）
                  </span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
