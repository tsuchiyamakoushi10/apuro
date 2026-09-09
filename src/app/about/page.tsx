import type { Metadata } from "next";
import { PageHeader, PanelSection, Section, SectionHead } from "@/components/Section";
import { ValueIcon } from "@/components/icons";
import { Eyebrow, Paragraphs, Photo, Picture, Tbd } from "@/components/ui";
import { copy, site } from "@/config/site";
import { greeting, mission, values, valueAxis, vision } from "@/content/about";

export const metadata: Metadata = {
  title: "アプロについて",
  description:
    "アプロ訪問看護ステーションのミッション・ビジョン・バリュー、代表挨拶、会社概要。国分寺市を中心に、こころの不調から在宅療養、看取りまでを担います。",
};

const photoClass = "h-[400px] rounded-panel max-[960px]:h-[230px]";

/**
 * ミッションとビジョン。写真は持たず、英字ラベルを左の列に出して組む。
 * 参照サイト（happywood.or.jp/vision）に合わせて、ページの写真は
 * 冒頭のメインビジュアルと代表挨拶の2枚に絞っている。
 */
const statements = [
  { eyebrow: "Mission", ...mission },
  { eyebrow: "Vision", ...vision },
];

export default function AboutPage() {
  return (
    <>
      {/* メインビジュアル。ページで使う写真はこの1枚と代表挨拶だけ（参照サイトと同じ）。
          TOPのヒーローと同じ全幅・下だけ角丸。写真はヒーローの3枚と別のものにする。
          高さは幅に追従させる（固定にすると広い画面ほど帯が細くなり、上下が落ちて顔が切れる）。
          3:2 を横長に切るので上が落ちる。24% は 2560px でも頭が切れない位置。
          写真を差し替えたら測り直すこと */}
      <Picture
        src="/images/staff-team.jpg"
        alt="事業所の前に立つスタッフ2名"
        sizes="100vw"
        position="center 24%"
        priority
        className="h-[clamp(320px,30vw,560px)] rounded-b-panel max-[960px]:h-[240px]"
      />

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

      {/* ミッションとビジョン。英字ラベルを左の列に出し、あいだを1本の罫線で区切る。
          ラベルの列は会社概要と同じ 200px。ページ全体を同じ組みに揃えるため。
          ラベルは見出しの1行目の高さに合わせて 0.55rem 下げる。見出し（30px・行間1.7）と
          ラベル（13.5px・行間1.6）では文字の天地が10pxずれるため。rem で書いてあるので
          PCの113%にも追従する。960px以下は1カラムになるので下げない。
          白地の .wrap に置く。淡い面（wrap-panel）に入れると文字の列が468pxまで狭まり、
          原稿にない位置で見出しが折れる。色を敷くのは最後の会社概要だけにしている */}
      <Section id="philosophy">
        <div className="wrap">
          {statements.map((statement, i) => (
            <div
              key={statement.eyebrow}
              className={`reveal grid grid-cols-[200px_1fr] items-start gap-[64px] max-[960px]:grid-cols-1 max-[960px]:gap-3 ${
                i > 0
                  ? "mt-[76px] border-t border-blue-soft pt-[76px] max-[960px]:mt-12 max-[960px]:pt-12"
                  : ""
              }`}
            >
              <Eyebrow className="!mb-0 mt-[0.55rem] max-[960px]:mt-0">{statement.eyebrow}</Eyebrow>
              <div>
                <h2>
                  {statement.heading.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <div className="mt-7">
                  <Paragraphs text={statement.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 行動指針。写真は使わず、番号の代わりにアイコンを左に置く（参照サイトと同じ並べ方） */}
      <Section id="values" className="!pt-0">
        <div className="wrap">
          <div className="reveal">
            <SectionHead eyebrow="Value" heading="行動指針" />
            {/* 1行で収まらないので text-balance で2行に割る。「社会へ。」だけが残らないように */}
            <p className="mt-6 text-balance font-heading text-[1.4375rem] leading-[1.7] text-blue-ink max-[960px]:text-[1.125rem]">
              {valueAxis}
            </p>
          </div>

          <ul className="mt-12 list-none border-t border-blue-soft max-[960px]:mt-9">
            {values.map((value) => (
              <li
                key={value.no}
                className="reveal grid grid-cols-[64px_1fr] items-start gap-8 border-b border-blue-soft py-8 max-[960px]:grid-cols-[56px_1fr] max-[960px]:gap-5 max-[960px]:py-7"
              >
                <ValueIcon no={value.no} />
                <div>
                  <h3>{value.title}</h3>
                  <Paragraphs text={value.body} className="mt-3 text-[0.9375rem] text-ink-muted" />
                </div>
              </li>
            ))}
          </ul>
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
