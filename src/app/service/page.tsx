import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHeader, PanelSection, Section, SectionHead } from "@/components/Section";
import { Lines, Paragraphs, Picture } from "@/components/ui";
import { site } from "@/config/site";
import {
  acceptance,
  cases,
  features,
  flow,
  oncall,
  overviewLead,
  treatment,
  whatWeDo,
} from "@/content/service";

export const metadata: Metadata = {
  title: "事業紹介",
  description:
    "国分寺市・小金井市・小平市の訪問看護。こころの不調を抱えた方への訪問看護、高齢者の在宅療養、医療処置、在宅での看取りまで対応します。24時間オンコール対応。",
};

export default function ServicePage() {
  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={
          <>
            <span className="block">介護も、精神も、</span>
            <span className="block">医療も、看取りも。</span>
          </>
        }
      />

      <Section id="overview">
        <div className="wrap grid grid-cols-[1fr_400px] items-center gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
          <div>
            <SectionHead eyebrow="Overview" heading="サービス概要" />
            <div className="mt-6">
              <Paragraphs text={overviewLead} />
            </div>
          </div>
          <Picture
            src="/images/hero-02-visit.jpg"
            alt="利用者宅で体調を確認する看護師"
            sizes="(max-width: 960px) 100vw, 400px"
            className="h-[360px] rounded-panel max-[960px]:h-[230px]"
          />
        </div>
      </Section>

      <PanelSection id="cases" tone="mist">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead eyebrow="Support" heading="こんなときに、ご相談ください" />
          <div className="mt-12 grid grid-cols-3 gap-6 max-[960px]:grid-cols-1">
            {cases.map((c) => (
              <div key={c.id} className="reveal rounded-card bg-paper p-8 max-[960px]:p-6">
                <h3>
                  {c.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <ul className="marker-list mt-5 text-[0.9375rem] text-ink-muted">
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </PanelSection>

      <Section id="what-we-do">
        <div className="wrap">
          <SectionHead eyebrow="What we do" heading="私たちが行うこと" />
          <ul className="mt-12 grid list-none grid-cols-2 gap-x-16 gap-y-8 max-[960px]:grid-cols-1 max-[960px]:gap-y-6">
            {whatWeDo.map((item) => (
              <li key={item.title} className="reveal border-t border-blue-soft pt-5">
                <h3 className="text-[1.1875rem]">{item.title}</h3>
                <p className="mt-1 text-[0.9375rem] text-ink-muted">{item.body}</p>
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

      {/* 受け入れについて。独立ブロックで置く */}
      <PanelSection id="acceptance" tone="blue">
        <div className="wrap-panel max-[960px]:px-6">
          <Lines
            text={acceptance}
            className="max-w-[30em] font-heading text-[1.875rem] leading-[1.75] text-paper max-[960px]:text-[1.1875rem]"
          />
        </div>
      </PanelSection>

      <Section id="oncall">
        <div className="wrap grid grid-cols-2 gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
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
      </Section>

      <PanelSection id="areas" tone="mist">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead eyebrow="Area" heading="対応エリア" />
          <ul className="mt-8 flex list-none flex-wrap gap-3">
            {site.areas.map((area) => (
              <li
                key={area}
                className="rounded-full bg-paper px-7 py-3 font-heading text-[0.9375rem] text-blue-ink"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.9375rem] text-ink-muted">{site.areaNote}</p>
        </div>
      </PanelSection>

      <Section id="flow">
        <div className="wrap">
          <SectionHead eyebrow="Flow" heading="ご利用までの流れ" />
          <div className="mt-12 grid grid-cols-2 gap-16 max-[960px]:grid-cols-1 max-[960px]:gap-10">
            {flow.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ol className="mt-6 list-none">
                  {group.steps.map((step, i) => (
                    <li key={step} className="grid grid-cols-[46px_1fr] items-start gap-2 pb-6">
                      <span className="font-en text-[0.875rem] tracking-[0.12em] text-blue">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.9375rem]">{step}</span>
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
