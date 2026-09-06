import type { Metadata } from "next";
import { FormCard } from "@/components/Contact";
import { PageHeader, PanelSection, Section, SectionHead } from "@/components/Section";
import { Lines, Paragraphs, Photo } from "@/components/ui";
import { copy, isTbd, recruitRequirementsReady, site } from "@/config/site";
import {
  benefits,
  education,
  greetingShort,
  honesty,
  jobs,
  lead,
  persona,
  philosophy,
  requirementGroups,
  weekFourPitch,
  workStyle,
} from "@/content/recruit";

export const metadata: Metadata = {
  title: "採用情報",
  description:
    "国分寺市の訪問看護ステーションで一緒に働く看護師を募集しています。1日の訪問件数は平均4件。訪問看護未経験の方は2週間の同行訪問から始めます。",
};

export default function RecruitPage() {
  const formReady = !isTbd(site.forms.recruit);

  return (
    <>
      <PageHeader
        eyebrow="Recruit"
        title={copy.recruitHeadline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        lead={<p>{copy.recruitSub}</p>}
      />

      <Section>
        <div className="wrap grid grid-cols-[1fr_400px] items-center gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
          <Paragraphs text={lead} />
          <Photo caption="写真｜スタッフ・事務所の様子" className="h-[320px] rounded-panel max-[960px]:h-[220px]" />
        </div>
      </Section>

      <PanelSection id="philosophy" tone="mist">
        <div className="wrap-panel grid grid-cols-[1fr_1fr] gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-8 max-[960px]:px-6">
          <SectionHead eyebrow="Our policy" heading="採用理念" />
          <Paragraphs text={philosophy} />
        </div>
      </PanelSection>

      <Section id="message">
        <div className="wrap grid grid-cols-[320px_1fr] items-start gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
          <Photo caption="写真｜代表 見須 清史" className="h-[380px] rounded-panel max-[960px]:h-[240px]" />
          <div>
            <SectionHead eyebrow="Message" heading="代表からのメッセージ" />
            <div className="mt-6">
              <Paragraphs text={greetingShort} />
            </div>
            <p className="mt-8 text-ink-muted">代表　{site.representative}</p>
          </div>
        </div>
      </Section>

      <Section id="persona" className="!pt-0">
        <div className="wrap">
          <SectionHead eyebrow="Person" heading="求める人物像" />
          <div className="mt-12 grid grid-cols-2 gap-6 max-[960px]:grid-cols-1">
            {persona.map((group) => (
              <div key={group.title} className="reveal rounded-card bg-mist p-10 max-[960px]:p-6">
                <h3>{group.title}</h3>
                <ul className="marker-list mt-5 text-[0.875rem]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <PanelSection id="work" tone="blue">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead
            eyebrow="Work style"
            heading={<span className="text-paper">働き方の特徴</span>}
            className="[&_.eyebrow]:text-paper"
          />
          <div className="mt-12 grid grid-cols-2 gap-6 max-[960px]:grid-cols-1">
            {workStyle.map((item) => (
              <div key={item.title} className="reveal rounded-card bg-paper p-8 max-[960px]:p-6">
                <h3>{item.title}</h3>
                <Paragraphs text={item.body} className="mt-4 text-[0.84375rem]" />
              </div>
            ))}
          </div>
        </div>
      </PanelSection>

      <Section id="education">
        <div className="wrap">
          <SectionHead eyebrow="Education" heading="教育・研修" />
          <div className="mt-12 grid grid-cols-2 gap-x-16 gap-y-10 max-[960px]:grid-cols-1 max-[960px]:gap-y-8">
            {education.map((item) => (
              <div key={item.title} className="reveal border-t border-blue-soft pt-6">
                <h3>{item.title}</h3>
                <Paragraphs text={item.body} className="mt-4 text-[0.84375rem]" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <PanelSection id="benefits" tone="mist">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead eyebrow="Benefits" heading="福利厚生" />
          <div className="mt-12 grid grid-cols-2 gap-x-16 gap-y-10 max-[960px]:grid-cols-1 max-[960px]:gap-y-8">
            {benefits.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul className="marker-list mt-4 text-[0.84375rem]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </PanelSection>

      {/* --sand を使う唯一のブロック */}
      <PanelSection id="honesty" tone="sand">
        <div className="wrap-panel max-[960px]:px-6">
          <h2 className="text-sand-ink">正直にお伝えしておきたいこと</h2>
          <Lines text={honesty.intro} className="mt-6 text-sand-ink" />
          <ul className="marker-list mt-6 text-sand-ink [&>li::before]:bg-sand-ink [&>li::before]:opacity-40">
            {honesty.items.map((item) => (
              <li key={item}>
                {item.split("\n").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sand-ink">{honesty.outro}</p>
        </div>
      </PanelSection>

      <Section id="requirements">
        <div className="wrap">
          <SectionHead eyebrow="Requirements" heading="募集要項" />

          {recruitRequirementsReady ? (
            <div className="mt-12 grid gap-14">
              {requirementGroups.map((group) => (
                <div key={group.heading}>
                  <h3>{group.heading}</h3>

                  {/* デスクトップは比較テーブル */}
                  <table className="mt-5 w-full border-collapse text-[0.84375rem] max-[960px]:hidden">
                    <thead>
                      <tr>
                        <th scope="col" className="w-[190px] border-b border-blue-soft py-3 text-left align-top font-heading text-blue-ink">
                          項目
                        </th>
                        {jobs.map((job) => (
                          <th
                            key={job.key}
                            scope="col"
                            className="border-b border-blue-soft py-3 text-left align-top font-heading text-blue-ink"
                          >
                            {job.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((row) => (
                        <tr key={row.label}>
                          <th scope="row" className="border-b border-blue-soft py-4 pr-6 text-left align-top font-normal text-ink-muted">
                            {row.label}
                          </th>
                          {jobs.map((job) => (
                            <td key={job.key} className="border-b border-blue-soft py-4 pr-6 align-top">
                              <Lines text={row.values[job.key]} className="max-w-none" />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* モバイルはカード積み */}
                  <div className="mt-5 hidden gap-4 max-[960px]:grid">
                    {jobs.map((job) => (
                      <div key={job.key} className="reveal rounded-card bg-mist p-6">
                        <h4 className="font-heading text-[0.9375rem] text-blue-ink">{job.label}</h4>
                        <dl className="mt-3 text-[0.8125rem]">
                          {group.rows.map((row) => (
                            <div key={row.label} className="border-t border-blue-soft py-3">
                              <dt className="text-ink-muted">{row.label}</dt>
                              <dd>
                                <Lines text={row.values[job.key]} className="max-w-none" />
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-card bg-mist p-10 max-[960px]:p-6">
              <p>
                募集要項は現在準備中です。条件の詳細は、お電話または応募フォームからお問い合わせください。
              </p>
              <p className="mt-4 text-[0.8125rem] text-ink-muted">
                <a href={site.telHref} className="border-b border-blue-soft">
                  {site.tel}
                </a>
                （{site.hours}）
              </p>
            </div>
          )}
        </div>
      </Section>

      <PanelSection id="week-four" tone="mist">
        <div className="wrap-panel grid grid-cols-[1fr_1fr] gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-8 max-[960px]:px-6">
          <SectionHead eyebrow="4 days a week" heading="週4日で、常勤という選び方" />
          <Paragraphs text={weekFourPitch} />
        </div>
      </PanelSection>

      <Section id="entry">
        <div className="wrap">
          <div className="grid grid-cols-2 gap-6 max-[960px]:grid-cols-1">
            <FormCard
              href={site.forms.recruit}
              ready={formReady}
              label="応募フォーム"
              lines={["24時間受付／2〜3営業日以内にご返信します", "ご質問だけのご連絡でも構いません"]}
            />
            <a
              className="flex items-center justify-between gap-5 rounded-card bg-mist px-[46px] py-11 max-[960px]:px-7 max-[960px]:py-8"
              href={site.telHref}
            >
              <span>
                <span className="block font-heading text-[1.1875rem] text-blue-ink">お電話でのお問い合わせ</span>
                <span className="block font-en text-[1.6875rem] leading-[1.3] text-blue-ink">{site.tel}</span>
                <span className="mt-1 block text-[0.75rem] text-ink-muted">{site.hours}</span>
              </span>
              <span
                aria-hidden="true"
                className="relative h-[52px] w-[52px] flex-shrink-0 rounded-full bg-blue after:absolute after:left-[45%] after:top-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:border-r-[1.5px] after:border-t-[1.5px] after:border-white after:content-['']"
              />
            </a>
          </div>
          <p className="mt-6 text-center text-[0.75rem] text-ink-muted">
            募集者：{site.company}（{site.name}）
          </p>
        </div>
      </Section>
    </>
  );
}
