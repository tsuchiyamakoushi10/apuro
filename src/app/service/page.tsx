import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHeader, PanelSection, Section, SectionHead } from "@/components/Section";
import { ServiceIcon } from "@/components/icons";
import { Eyebrow, Paragraphs, Picture } from "@/components/ui";
import { site } from "@/config/site";
import { cases, features, flow, oncall, overviewLead, treatment, whatWeDo } from "@/content/service";

export const metadata: Metadata = {
  title: "事業紹介",
  description:
    "国分寺市・小金井市・小平市の訪問看護。こころの不調を抱えた方への訪問看護、高齢者の在宅療養、医療処置、在宅での看取りまで対応します。24時間オンコール対応。",
};

export default function ServicePage() {
  return (
    <>
      {/* メインビジュアル。/about と同じ置き方。写真はページごとに変える。
          3:2 を横長に切るので上が落ちる。20% は 2560px でも2人の頭が切れない位置。
          写真を差し替えたら測り直すこと */}
      <Picture
        src="/images/hero-02-visit.jpg"
        alt="利用者宅で体調を確認する看護師"
        sizes="100vw"
        position="center 20%"
        priority
        className="h-[clamp(320px,30vw,560px)] rounded-b-panel max-[960px]:h-[240px]"
      />

      <PageHeader
        eyebrow="Service"
        title={
          <>
            <span className="block">介護も、精神も、</span>
            <span className="block">医療も、看取りも。</span>
          </>
        }
      />

      {/* 概要は写真を持たない。ページの写真はメインビジュアルと特徴の4枚 */}
      <Section id="overview">
        <div className="wrap">
          <SectionHead eyebrow="Overview" heading="サービス概要" />
          <div className="mt-6">
            <Paragraphs text={overviewLead} />
          </div>
        </div>
      </Section>

      {/* こんなときに。3枚とも項目を出すと縦に長くなるので、PCは要約だけ見せ、
          カーソルを当てたカードだけ項目に入れ替える（`.case-card` / globals.css）。
          960px以下はカーソルがないので、はじめから項目を出す */}
      <PanelSection id="cases" tone="mist">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead eyebrow="Support" heading="こんなときに、ご相談ください" />
          <div className="mt-12 grid grid-cols-3 gap-6 max-[960px]:mt-9 max-[960px]:grid-cols-1">
            {cases.map((c) => (
              <div key={c.id} className="case-card reveal rounded-card bg-paper p-8 max-[960px]:p-6">
                <h3 className="text-[1.1875rem]">
                  {c.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                <div className="case-summary">
                  <div>
                    <p className="mt-4 text-[0.9375rem] text-ink-muted">{c.summary}</p>
                  </div>
                </div>

                <div className="case-items">
                  <div>
                    <ul className="marker-list mt-4 text-[0.9375rem] text-ink-muted">
                      {c.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PanelSection>

      {/* 私たちが行うこと。項目ごとにアイコンを左に置く */}
      <Section id="what-we-do">
        <div className="wrap">
          <SectionHead eyebrow="What we do" heading="私たちが行うこと" />
          <ul className="mt-12 grid list-none grid-cols-2 gap-x-16 gap-y-8 max-[960px]:mt-9 max-[960px]:grid-cols-1 max-[960px]:gap-y-6">
            {whatWeDo.map((item) => (
              <li
                key={item.id}
                className="reveal grid grid-cols-[48px_1fr] items-start gap-5 border-t border-blue-soft pt-5"
              >
                <ServiceIcon id={item.id} />
                <div>
                  <h3 className="text-[1.1875rem]">{item.title}</h3>
                  <p className="mt-1 text-[0.9375rem] text-ink-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="features" className="!pt-0">
        <div className="wrap">
          <SectionHead eyebrow="Features" heading="アプロの特徴" />
          <div className="mt-12 grid gap-6">
            {features.slice(0, 4).map((feature) => (
              <article
                key={feature.id}
                id={feature.id}
                className={`reveal grid items-start gap-12 rounded-card bg-mist p-10 max-[960px]:grid-cols-1 max-[960px]:gap-6 max-[960px]:p-6 ${
                  feature.image ? "grid-cols-[320px_1fr]" : "grid-cols-1"
                }`}
              >
                {feature.image && (
                  <Picture
                    src={feature.image.src}
                    alt={feature.image.alt}
                    sizes="(max-width: 960px) 100vw, 320px"
                    className="h-[200px] rounded-card max-[960px]:h-[170px]"
                  />
                )}
                <div>
                  <span className="block font-en text-[0.875rem] tracking-[0.12em] text-blue">
                    {feature.no}
                  </span>
                  <h3 className="mt-1">{feature.title}</h3>
                  <Paragraphs text={feature.body} className="mt-4 text-[0.9375rem]" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* 24時間対応と医療処置。白が続くので淡い面に乗せる */}
      <PanelSection id="oncall" tone="mist">
        <div className="wrap-panel grid grid-cols-2 gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-8 max-[960px]:px-6">
          <div>
            <SectionHead eyebrow="24 hours" heading="24時間対応" />
            <div className="mt-6">
              <Paragraphs text={oncall} />
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Treatment" heading="対応できる医療処置" />
            <div className="mt-6" id="treatment">
              <Paragraphs text={treatment} />
            </div>
          </div>
        </div>
      </PanelSection>

      {/* 対応エリア。市を共通モチーフの面で並べ、横線でつないで図にする。
          青ベタ面はページでここだけ。受け入れの一文を外したぶんの青をここで戻している */}
      <PanelSection id="areas" tone="blue">
        <div className="wrap-panel max-[960px]:px-6">
          <Eyebrow className="!text-paper">Area</Eyebrow>
          <h2 className="text-paper">対応エリア</h2>

          <ul className="area-map mt-12 grid list-none grid-cols-3 gap-6 max-[960px]:mt-9 max-[960px]:gap-3">
            {site.areas.map((area) => (
              <li key={area} className="reveal flex justify-center">
                <span className="area-mark">{area}</span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-9 text-center text-[0.9375rem] text-[rgba(255,255,255,0.82)] max-[960px]:mt-7">
            {site.areaNote}
          </p>
        </div>
      </PanelSection>

      {/* ご利用までの流れ。番号を共通モチーフの面に入れ、縦線でつないで図にする */}
      <Section id="flow">
        <div className="wrap">
          <SectionHead eyebrow="Flow" heading="ご利用までの流れ" />
          <div className="mt-12 grid grid-cols-2 gap-16 max-[960px]:mt-9 max-[960px]:grid-cols-1 max-[960px]:gap-10">
            {flow.map((group) => (
              <div key={group.title}>
                <h3 className="text-[1.1875rem]">{group.title}</h3>
                <ol className="mt-7 list-none">
                  {group.steps.map((step, i) => (
                    <li
                      key={step}
                      className="flow-step grid grid-cols-[52px_1fr] items-start gap-4 pb-8 last:pb-0"
                    >
                      <span className="flow-no">{String(i + 1).padStart(2, "0")}</span>
                      <span className="pt-1.5 text-[0.9375rem]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
}
