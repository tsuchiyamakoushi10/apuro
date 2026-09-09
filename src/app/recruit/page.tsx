import type { Metadata } from "next";
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
       * 採用理念を導入に置き、働き方・教育・人物像をこの節の中に収めた。
       * 以前は理念・代表挨拶・人物像・働き方・教育を別々の節に分けていて、
       * 読み終わるまでが長かった。代表挨拶は /about にあるので採用ページからは外した
       */}
      <Section id="features" className="!pt-0">
        <div className="wrap">
          <SectionHead eyebrow="Features" heading="採用の特徴" />
          <div className="mt-6">
            <Paragraphs text={philosophy} />
          </div>

          <h3 className="mt-16 max-[960px]:mt-12">働き方</h3>
          <div className="mt-6 grid grid-cols-2 gap-6 max-[960px]:grid-cols-1 max-[960px]:gap-4">
            {workStyle.map((item) => (
              <div key={item.title} className="reveal rounded-card bg-mist p-8 max-[960px]:p-6">
                <h4 className="font-heading text-[1.1875rem] font-medium text-blue-ink">
                  {item.title}
                </h4>
                <Paragraphs text={item.body} className="mt-3 text-[0.9375rem]" />
              </div>
            ))}
          </div>

          <h3 className="mt-16 max-[960px]:mt-12">教育・研修</h3>
          <div className="mt-6 grid grid-cols-2 gap-6 max-[960px]:grid-cols-1 max-[960px]:gap-4">
            {education.map((item) => (
              <div key={item.title} className="reveal rounded-card bg-mist p-8 max-[960px]:p-6">
                <h4 className="font-heading text-[1.1875rem] font-medium text-blue-ink">
                  {item.title}
                </h4>
                <Paragraphs text={item.body} className="mt-3 text-[0.9375rem]" />
              </div>
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
        </div>
      </Section>

      {/* --sand を使う唯一のブロック。応募の前に読んでおいてほしい内容なので、
          特徴と募集要項のあいだに置く */}
      <PanelSection id="honesty" tone="sand">
        <div className="wrap-panel max-[960px]:px-6">
          <h2 className="text-sand-ink">正直にお伝えしておきたいこと</h2>
          <Lines text={honesty.intro} reflow className="mt-6 text-sand-ink" />
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

      {/* 福利厚生。原稿の4区分にアイコンを1つずつ。青ベタ面はページでここだけ */}
      <PanelSection id="benefits" tone="blue">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead
            eyebrow="Benefits"
            heading={<span className="text-paper">福利厚生</span>}
            className="[&_.eyebrow]:!text-paper"
          />
          <div className="mt-12 grid grid-cols-2 gap-6 max-[960px]:mt-9 max-[960px]:grid-cols-1 max-[960px]:gap-4">
            {benefits.map((group) => (
              <div key={group.id} className="reveal rounded-card bg-paper p-8 max-[960px]:p-6">
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

      {/* 募集要項。週4日の訴求文もこの節に入れて、条件をひとまとまりで読めるようにする */}
      <Section id="requirements">
        <div className="wrap">
          <SectionHead eyebrow="Requirements" heading="募集要項" />

          {recruitRequirementsReady ? (
            <div className="mt-12 grid gap-14 max-[960px]:mt-9">
              {requirementGroups.map((group) => (
                <div key={group.heading}>
                  <h3>{group.heading}</h3>

                  {/* デスクトップは比較テーブル */}
                  <table className="mt-5 w-full border-collapse text-[0.9375rem] max-[960px]:hidden">
                    {/* th は既定が太字（700）。日本語の700は読み込んでいないので、
                        指定しないと合成された偽の太字になる。見出しと同じ500に揃える */}
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="w-[190px] border-b border-blue-soft py-3 text-left align-top font-heading font-medium text-blue-ink"
                        >
                          項目
                        </th>
                        {jobs.map((job) => (
                          <th
                            key={job.key}
                            scope="col"
                            className="border-b border-blue-soft py-3 text-left align-top font-heading font-medium text-blue-ink"
                          >
                            {job.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((row) => (
                        <tr key={row.label}>
                          <th
                            scope="row"
                            className="border-b border-blue-soft py-4 pr-6 text-left align-top font-normal text-ink-muted"
                          >
                            {row.label}
                          </th>
                          {jobs.map((job) => (
                            <td
                              key={job.key}
                              className="border-b border-blue-soft py-4 pr-6 align-top"
                            >
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
                        <dl className="mt-3 text-[0.875rem]">
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
              <p className="mt-4 text-[0.875rem] text-ink-muted">
                <a href={site.telHref} className="border-b border-blue-soft">
                  {site.tel}
                </a>
                （{site.hours}）
              </p>
            </div>
          )}

          <div className="reveal mt-14 rounded-card bg-mist p-10 max-[960px]:mt-10 max-[960px]:p-6">
            <h3 className="text-[1.1875rem]">週4日で、常勤という選び方</h3>
            <Paragraphs text={weekFourPitch} className="mt-4 text-[0.9375rem]" />
          </div>
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
