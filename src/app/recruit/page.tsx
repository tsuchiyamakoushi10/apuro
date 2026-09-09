import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FormCard, TelCard } from "@/components/Contact";
import { PageHeader, PanelSection, Section, SectionHead } from "@/components/Section";
import { BenefitIcon } from "@/components/icons";
import { Lines, Paragraphs, Picture } from "@/components/ui";
import { copy, isTbd, recruitRequirementsReady, site } from "@/config/site";
import {
  benefits,
  education,
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

/**
 * 開いて読む項目。既定は閉じておく。
 *
 * 採用ページは項目が多く、全部を開いたままだと文字の壁になる。
 * 見出しだけを並べて、読みたい人が開く形にした。
 * JavaScriptを使わない `<details>`。キーボードでも開閉できる。
 * ▼はヘッダーのMENUと同じ形と回し方に揃えている
 */
function Disclosure({
  title,
  note,
  children,
}: {
  title: string;
  /** 見出しの右に出す一言。開かなくても要点が分かるようにする */
  note?: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-b border-blue-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden max-[960px]:py-5">
        <span className="flex items-baseline gap-4 max-[600px]:flex-col max-[600px]:gap-1">
          <span className="font-heading text-[1.1875rem] font-medium text-blue-ink">{title}</span>
          {note ? <span className="text-[0.9375rem] text-ink-muted">{note}</span> : null}
        </span>
        <span
          aria-hidden="true"
          className="h-[9px] w-[9px] shrink-0 rotate-135 border-r-[1.5px] border-t-[1.5px] border-blue transition-transform duration-300 group-open:rotate-[315deg]"
        />
      </summary>
      <div className="pb-7 max-[960px]:pb-6">{children}</div>
    </details>
  );
}

export default function RecruitPage() {
  const formReady = !isTbd(site.forms.recruit);

  return (
    <>
      {/* メインビジュアル。他のページと同じ置き方。ページの写真はこの1枚だけ。
          3:2 を横長に切るので上が落ちる。40% は 2560px でも3人の頭が切れない位置。
          写真を差し替えたら測り直すこと */}
      <Picture
        src="/images/office-meeting.jpg"
        alt="事務所で記録を見ながら話すスタッフ3名"
        sizes="100vw"
        position="center 40%"
        priority
        className="h-[clamp(320px,30vw,560px)] rounded-b-panel max-[960px]:h-[240px]"
      />

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
        <div className="wrap">
          <Paragraphs text={lead} />
        </div>
      </Section>

      {/*
       * 採用の特徴。参照サイト（artlife.bz/recruit）と同じで、
       * メイン画像・特徴・福利厚生・募集要項・エントリーの並びにまとめている。
       * 働き方と教育は開閉にした。合わせて9項目あり、開いたままだと文字の壁になる。
       * 採用理念と人物像は短いので開いたまま置く
       */}
      <Section id="features" className="!pt-0">
        <div className="wrap">
          <SectionHead eyebrow="Features" heading="採用の特徴" />
          <div className="mt-6">
            <Paragraphs text={philosophy} />
          </div>

          <h3 className="mt-16 max-[960px]:mt-12">働き方</h3>
          <div className="mt-6 border-t border-blue-soft">
            {workStyle.map((item) => (
              <Disclosure key={item.title} title={item.title}>
                <Paragraphs text={item.body} className="text-[0.9375rem]" />
              </Disclosure>
            ))}
          </div>

          <h3 className="mt-16 max-[960px]:mt-12">教育・研修</h3>
          <div className="mt-6 border-t border-blue-soft">
            {education.map((item) => (
              <Disclosure key={item.title} title={item.title}>
                <Paragraphs text={item.body} className="text-[0.9375rem]" />
              </Disclosure>
            ))}
          </div>

          <h3 className="mt-16 max-[960px]:mt-12">求める人物像</h3>
          <div className="mt-6 grid grid-cols-2 gap-6 max-[960px]:grid-cols-1 max-[960px]:gap-4">
            {persona.map((group) => (
              <div
                key={group.title}
                className="reveal rounded-card border border-blue-soft p-8 max-[960px]:p-6"
              >
                <h4 className="font-heading text-[1.1875rem] font-medium text-blue-ink">
                  {group.title}
                </h4>
                <ul className="marker-list mt-4 text-[0.9375rem]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 応募の前に読んでおいてほしい内容。面で色を敷かず、罫線のカードで置く。
              すぐ下に福利厚生の淡い面が来るので、ここを淡い面にすると面が続いて見える */}
          <div className="reveal mt-16 rounded-card border border-blue-soft p-10 max-[960px]:mt-12 max-[960px]:p-6">
            <h3 className="text-[1.1875rem]">正直にお伝えしておきたいこと</h3>
            <Lines text={honesty.intro} reflow className="mt-4 text-[0.9375rem]" />
            <ul className="marker-list mt-4 text-[0.9375rem]">
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
            <p className="mt-4 text-[0.9375rem]">{honesty.outro}</p>
          </div>
        </div>
      </Section>

      {/* 福利厚生。原稿の4区分にアイコンを1つずつ。淡い面はページでここだけ */}
      <PanelSection id="benefits" tone="mist">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead eyebrow="Benefits" heading="福利厚生" />
          <div className="mt-12 grid grid-cols-2 gap-x-16 gap-y-12 max-[960px]:mt-9 max-[960px]:grid-cols-1 max-[960px]:gap-y-8">
            {benefits.map((group) => (
              <div key={group.id} className="reveal">
                <BenefitIcon id={group.id} />
                <h3 className="mt-5 text-[1.1875rem]">{group.title}</h3>
                <ul className="marker-list mt-4 text-[0.9375rem]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </PanelSection>

      {/* 募集要項。職種ごとに閉じておく。3職種を横に並べて見比べる表はやめた。
          見出しに給与を出して、開かなくても待遇の当たりがつくようにしている */}
      <Section id="requirements">
        <div className="wrap">
          <SectionHead eyebrow="Requirements" heading="募集要項" />

          {recruitRequirementsReady ? (
            <div className="mt-10 border-t border-blue-soft max-[960px]:mt-8">
              {jobs.map((job) => (
                <Disclosure
                  key={job.key}
                  title={job.label}
                  note={site.recruit.salaryDisplay[job.key]}
                >
                  {job.key === "fourDay" ? (
                    <Paragraphs text={weekFourPitch} className="mb-8 text-[0.9375rem]" />
                  ) : null}

                  <div className="grid gap-10">
                    {requirementGroups.map((group) => (
                      <div key={group.heading}>
                        <h4 className="font-heading text-[0.9375rem] text-blue">{group.heading}</h4>
                        <dl className="mt-2 border-t border-blue-soft text-[0.9375rem]">
                          {group.rows.map((row) => (
                            <div
                              key={row.label}
                              className="grid grid-cols-[190px_1fr] gap-6 border-b border-blue-soft py-4 max-[960px]:grid-cols-1 max-[960px]:gap-1 max-[960px]:py-3"
                            >
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
                </Disclosure>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-card bg-mist p-10 max-[960px]:p-6">
              <p>
                募集要項は現在準備中です。条件の詳細は、お電話または応募フォームからお問い合わせください。
              </p>
              <p className="mt-4 text-[0.875rem] text-ink-muted">
                <a href={site.telHref} className="border-b border-blue-soft">
                  {site.tel}
                </a>
                （{site.hours}）
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section id="entry" className="!pt-0">
        <div className="wrap">
          <SectionHead eyebrow="Entry" heading="ご応募・お問い合わせ" />
          <div className="mt-10 grid grid-cols-2 gap-6 max-[960px]:mt-8 max-[960px]:grid-cols-1">
            <FormCard
              href={site.forms.recruit}
              ready={formReady}
              label="応募フォーム"
              lines={["24時間受付／2〜3営業日以内にご返信します", "ご質問だけのご連絡でも構いません"]}
            />
            <TelCard label="お電話でのお問い合わせ" note={site.hours} />
          </div>
          <p className="mt-6 text-center text-[0.84375rem] text-ink-muted">
            募集者：{site.company}（{site.name}）
          </p>
        </div>
      </Section>
    </>
  );
}
