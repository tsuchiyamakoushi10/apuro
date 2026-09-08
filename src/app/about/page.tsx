import type { Metadata } from "next";
import { PageHeader, PanelSection, Section, SectionHead } from "@/components/Section";
import { Paragraphs, Photo, Picture, Tbd } from "@/components/ui";
import { copy, site } from "@/config/site";
import { greeting, mission, values, valueAxis, vision } from "@/content/about";

export const metadata: Metadata = {
  title: "アプロについて",
  description:
    "アプロ訪問看護ステーションのミッション・ビジョン・バリュー、代表挨拶、会社概要。国分寺市を中心に、こころの不調から在宅療養、看取りまでを担います。",
};

/** 見出しの下に並べる3枚。訪問・事務所・事業所の前で場面を散らす */
const headerPhotos = [
  {
    src: "/images/hero-02-visit.jpg",
    alt: "利用者の体調を確かめる看護師",
    position: "center 32%",
  },
  { src: "/images/staff-office.jpg", alt: "事務所で記録を確認するスタッフ", position: "center 42%" },
  { src: "/images/staff-team.jpg", alt: "事業所の前に立つスタッフ2名", position: "center 40%" },
];

const photoClass = "h-[400px] rounded-panel max-[960px]:h-[230px]";
const photoSizes = "(max-width: 960px) 100vw, 360px";

/**
 * ミッションとビジョン。写真を左、見出しと本文を右に置く。
 * 参照サイト（npoho-jin.com/about_us）と同じ組み方で、写真は左に揃える。
 */
function Statement({
  eyebrow,
  heading,
  body,
  photo,
}: {
  eyebrow: string;
  heading: string[];
  body: string;
  photo: { src: string; alt: string; position: string };
}) {
  return (
    <div className="grid grid-cols-[360px_1fr] items-center gap-[64px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
      <Picture
        src={photo.src}
        alt={photo.alt}
        sizes={photoSizes}
        position={photo.position}
        className={`reveal ${photoClass}`}
      />
      <div className="reveal">
        <SectionHead
          eyebrow={eyebrow}
          heading={heading.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        />
        <div className="mt-6">
          <Paragraphs text={body} />
        </div>
      </div>
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

      <div className="wrap mt-[60px] grid grid-cols-3 gap-6 max-[960px]:mt-8 max-[960px]:gap-3">
        {headerPhotos.map((photo) => (
          <Picture
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            sizes="(max-width: 960px) 32vw, 360px"
            position={photo.position}
            className="reveal h-[260px] rounded-panel max-[960px]:h-[110px] max-[960px]:rounded-card"
          />
        ))}
      </div>

      <Section id="philosophy">
        <div className="wrap">
          <Statement
            eyebrow="Mission"
            heading={mission.heading}
            body={mission.body}
            photo={{
              src: "/images/hero-01-departure.jpg",
              alt: "訪問へ出発する看護師",
              position: "center 30%",
            }}
          />
        </div>
      </Section>

      {/* ミッションからバリューまでは白地の .wrap に置く。淡い面（wrap-panel）に入れると
          文字の列が468pxまで狭まり、原稿にない位置で見出しと本文が折れるため。
          色を敷くのは最後の会社概要だけにしている */}
      <Section className="!pt-0">
        <div className="wrap">
          <Statement
            eyebrow="Vision"
            heading={vision.heading}
            body={vision.body}
            photo={{
              src: "/images/hero-03-team.jpg",
              alt: "事務所で申し送りをするスタッフ",
              position: "center 40%",
            }}
          />
        </div>
      </Section>

      <Section id="values" className="!pt-0">
        <div className="wrap grid grid-cols-[360px_1fr] items-start gap-[64px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
          {/* 行動指針は5項目と長いので写真は sticky。
              祖先に .reveal を付けない（translate が包含ブロックを作って sticky が壊れるため） */}
          <div className="sticky top-[150px] max-[960px]:static">
            <Picture
              src="/images/representative-visit.jpg"
              alt={`利用者宅で聴診する代表の${site.representative}`}
              sizes={photoSizes}
              position="center 35%"
              className={photoClass}
            />
          </div>

          <div>
            <SectionHead eyebrow="Value" heading="行動指針" />
            {/* 1行で収まらないので text-balance で2行に割る。「社会へ。」だけが残らないように */}
            <p className="mt-6 text-balance font-heading text-[1.4375rem] leading-[1.7] text-blue-ink max-[960px]:text-[1.125rem]">
              {valueAxis}
            </p>

            <ul className="mt-10 list-none border-t border-blue-soft">
              {values.map((value) => (
                <li key={value.no} className="border-b border-blue-soft py-7">
                  <span className="block font-en text-[0.875rem] tracking-[0.12em] text-blue">
                    {value.no}
                  </span>
                  <h3 className="mt-1">{value.title}</h3>
                  <Paragraphs text={value.body} className="mt-3 text-[0.9375rem] text-ink-muted" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="greeting" className="!pt-0">
        <div className="wrap grid grid-cols-[360px_1fr] items-start gap-[64px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
          <div className="sticky top-[150px] max-[960px]:static">
            <Photo caption="写真｜代表 見須 清史" className={photoClass} />
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
