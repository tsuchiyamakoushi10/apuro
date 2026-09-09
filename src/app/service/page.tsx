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

/**
 * 地図に重ねる市名の位置。`scripts/make-tokyo-map.py` が出す％をそのまま入れる。
 * 地図を作り直したら入れ直すこと。
 * 近隣は対応エリアの外。「上記以外の地域も、まずはご相談ください」の手掛かりになるので出す
 */
const areaLabels = [
  { name: "小金井市", left: "64.3%", top: "63.1%" },
  { name: "小平市", left: "51.0%", top: "38.4%" },
  { name: "国分寺市", left: "41.8%", top: "59.0%" },
];

const nearbyLabels = [
  { name: "立川市", left: "16.3%", top: "50.6%" },
  { name: "武蔵野市", left: "87.1%", top: "56.5%" },
  { name: "三鷹市", left: "86.5%", top: "78.7%" },
  { name: "府中市", left: "51.7%", top: "92.0%" },
  { name: "東村山市", left: "46.9%", top: "8.3%" },
  { name: "国立市", left: "31.7%", top: "77.0%" },
  { name: "東大和市", left: "26.2%", top: "16.8%" },
  { name: "東久留米市", left: "68.2%", top: "13.4%" },
  { name: "武蔵村山市", left: "7.0%", top: "16.7%" },
  { name: "西東京市", left: "80.1%", top: "31.3%" },
];

export default function ServicePage() {
  return (
    <>
      {/* メインビジュアル。/about と同じ置き方。写真はページごとに変える。
          3:2 を横長に切るので上が落ちる。31% は 2560px でも顔が切れない位置。
          写真を差し替えたら測り直すこと */}
      <Picture
        src="/images/visit-bicycle.jpg"
        alt="自転車で訪問先へ向かう看護師"
        sizes="100vw"
        position="center 31%"
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

      {/* こんなときに。3列に縦積みすると1列が長くなって読みにくいので、
          1枚を横長にして見出しを左、項目を右に置く。開閉も入れ替えもしない。
          カーソルで内容が入れ替わると、読んでいた文が消えて分かりにくいため */}
      <PanelSection id="cases" tone="mist">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead eyebrow="Support" heading="こんなときに、ご相談ください" />
          <div className="mt-12 grid gap-6 max-[960px]:mt-9 max-[960px]:gap-4">
            {cases.map((c) => (
              <div
                key={c.id}
                className="reveal grid grid-cols-[240px_1fr] gap-[56px] rounded-card bg-paper p-9 max-[960px]:grid-cols-1 max-[960px]:gap-4 max-[960px]:p-6"
              >
                <h3 className="text-[1.1875rem]">
                  {c.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <ul className="marker-list text-[0.9375rem] text-ink-muted">
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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

      {/* 対応エリア。東京都の地図に対応する3市を塗って示す。
          市名を並べるだけだと位置が伝わらず、初めて見る方が自分の地域か判断できないため。
          地図は国土数値情報（行政区域データ）から作った `public/images/tokyo-map.svg`。
          作り直しは `scripts/make-tokyo-map.py`。**出典表記は利用約款の条件なので消さないこと。**
          青ベタ面はページでここだけ。受け入れの一文を外したぶんの青をここで戻している */}
      <PanelSection id="areas" tone="blue">
        <div className="wrap-panel max-[960px]:px-6">
          <Eyebrow className="!text-paper">Area</Eyebrow>
          <h2 className="text-paper">対応エリア</h2>

          <div className="reveal mt-10 rounded-panel bg-paper p-8 max-[960px]:mt-8 max-[960px]:p-5">
            <div className="relative">
              {/* 拡大しても粗くならないので next/image は通さない。
                  幅と高さを書いて読み込み前の場所を確保する。
                  SVG側にも width/height を入れてある。どちらか欠けると
                  height:auto でブラウザが高さを決められず、地図が潰れる。
                  ページのだいぶ下にあるので遅延読み込みにする */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/tokyo-map.svg"
                alt="国分寺市・小金井市・小平市とその周辺の地図。3市を対応エリアとして塗り分けている"
                width={1000}
                height={588}
                loading="lazy"
                decoding="async"
                className="aspect-[1000/588] h-auto w-full"
              />

              {/* 市名はHTMLで重ねる。SVGに入れると画面幅に合わせて文字まで伸び縮みしてしまう。
                  位置は scripts/make-tokyo-map.py が出した％をそのまま入れている。
                  600px以下は地図が小さく、市の形から文字がはみ出すので出さない。
                  市名は下のピルにも出ているので読み上げからは外す */}
              {areaLabels.map((label) => (
                <span
                  key={label.name}
                  aria-hidden="true"
                  style={{ left: label.left, top: label.top }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-heading text-[0.8125rem] text-paper max-[600px]:hidden"
                >
                  {label.name}
                </span>
              ))}

              {/* 近隣はエリア外。色を変えて、対応している3市と見分けがつくようにする */}
              {nearbyLabels.map((label) => (
                <span
                  key={label.name}
                  aria-hidden="true"
                  style={{ left: label.left, top: label.top }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-heading text-[0.8125rem] text-blue max-[600px]:hidden"
                >
                  {label.name}
                </span>
              ))}
            </div>

            <p className="mt-5 text-right text-[0.8125rem] text-ink-muted">
              出典：国土数値情報（行政区域データ・国土交通省）を加工して作成
            </p>
          </div>

          <ul className="mt-8 flex list-none flex-wrap gap-3 max-[960px]:mt-6">
            {site.areas.map((area) => (
              <li
                key={area}
                className="rounded-full bg-paper px-7 py-3 font-heading text-[0.9375rem] text-blue-ink max-[960px]:px-5"
              >
                {area}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[0.9375rem] text-[rgba(255,255,255,0.82)]">{site.areaNote}</p>
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
