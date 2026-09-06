import type { Metadata } from "next";
import { PageHeader, PanelSection, Section, SectionHead } from "@/components/Section";
import { Paragraphs, Photo, Tbd } from "@/components/ui";
import { copy, site } from "@/config/site";
import { greeting, mission, values, valueAxis, vision } from "@/content/about";

export const metadata: Metadata = {
  title: "アプロについて",
  description:
    "アプロ訪問看護ステーションのミッション・ビジョン・バリュー、代表挨拶、会社概要。国分寺市を中心に、こころの不調から在宅療養、看取りまでを担います。",
};

function Statement({
  eyebrow,
  heading,
  body,
}: {
  eyebrow: string;
  heading: string[];
  body: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
      <SectionHead
        eyebrow={eyebrow}
        heading={heading.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      />
      <Paragraphs text={body} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={
          <>
            <span className="block">こころの不調から、</span>
            <span className="block">在宅療養、看取りまで。</span>
          </>
        }
        lead={
          <p>
            アプロ訪問看護ステーションは、{site.areas.join("・")}
            を中心に、こころの不調を抱えた方への訪問看護から高齢者の在宅療養、そして看取りまでを担う訪問看護ステーションです。
          </p>
        }
      />

      <Section id="philosophy">
        <div className="wrap">
          <Statement eyebrow="Mission" heading={mission.heading} body={mission.body} />
        </div>
      </Section>

      <PanelSection tone="mist">
        <div className="wrap-panel max-[960px]:px-6">
          <Statement eyebrow="Vision" heading={vision.heading} body={vision.body} />
        </div>
      </PanelSection>

      <Section id="values">
        <div className="wrap">
          <SectionHead eyebrow="Value" heading="行動指針" />
          <p className="mt-6 font-heading text-[21px] leading-[1.7] text-blue-ink max-[960px]:text-[18px]">
            {valueAxis}
          </p>

          <ul className="mt-12 grid list-none grid-cols-2 gap-6 max-[960px]:grid-cols-1">
            {values.map((value) => (
              <li key={value.no} className="rounded-card bg-mist p-8 max-[960px]:p-6">
                <span className="block font-en text-[13px] tracking-[0.12em] text-blue">{value.no}</span>
                <h3 className="mt-1">{value.title}</h3>
                <Paragraphs text={value.body} className="mt-4 text-[13.5px] text-ink-muted" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="greeting" className="!pt-0">
        <div className="wrap grid grid-cols-[380px_1fr] items-start gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
          <div className="sticky top-[150px] max-[960px]:static">
            <Photo caption="写真｜代表 見須 清史" className="h-[440px] rounded-panel max-[960px]:h-[260px]" />
          </div>
          <div>
            <SectionHead eyebrow="Message" heading={<Tbd value={copy.greetingHeadline} />} />
            <div className="mt-8">
              <Paragraphs text={greeting} />
            </div>
            <p className="mt-10 text-ink-muted">
              <span className="block">{site.name}</span>
              <span className="block">代表　{site.representative}</span>
            </p>
          </div>
        </div>
      </Section>

      <PanelSection id="company" tone="mist">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead eyebrow="Company" heading="会社概要" />
          <dl className="mt-10 border-t border-blue-soft">
            {[
              { k: "事業所名", v: site.name },
              { k: "運営法人", v: site.company },
              { k: "代表者", v: site.representative },
              { k: "所在地", v: <Tbd value={site.address} /> },
              { k: "アクセス", v: <Tbd value={site.access} /> },
              {
                k: "TEL / FAX",
                v: (
                  <>
                    <a href={site.telHref}>{site.tel}</a> / {site.fax}
                  </>
                ),
              },
              { k: "営業時間", v: `${site.hours}　※${site.holiday}休み、${site.oncall}` },
              { k: "資本金", v: site.capital },
              { k: "創立", v: site.established },
              { k: "従業員数", v: site.staff },
              ...(site.showLicenseNumber
                ? [{ k: "介護保険事業所番号", v: site.licenseNumber }]
                : []),
              ...(site.showAddons ? [{ k: "取得加算", v: site.addons.join("／") }] : []),
              { k: "対応エリア", v: site.areas.join("・") },
            ].map((row) => (
              <div
                key={row.k}
                className="grid grid-cols-[200px_1fr] gap-6 border-b border-blue-soft py-5 max-[960px]:grid-cols-1 max-[960px]:gap-1"
              >
                <dt className="font-heading text-blue-ink">{row.k}</dt>
                <dd className="max-w-[34em]">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PanelSection>
    </>
  );
}
