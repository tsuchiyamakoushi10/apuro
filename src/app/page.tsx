import Image from "next/image";
import { Contact } from "@/components/Contact";
import { PanelSection, Section, SectionHead } from "@/components/Section";
import { Eyebrow, Photo, Pill } from "@/components/ui";
import { copy } from "@/config/site";
import { cases, topFeatures } from "@/content/service";

const aboutLead =
  "アプロ訪問看護ステーションは、国分寺市を中心に、こころの不調を抱えた方への訪問看護から高齢者の在宅療養、そして看取りまでを担う訪問看護ステーションです。どんな状況の方でも、まずはご相談ください。";

/**
 * ヒーローの写真。3枚を18秒で1周する（docs/spec.md 5章）。
 * prefers-reduced-motion のときは1枚目のまま動かない。
 *
 * alt は1枚目にだけ入れる。3枚は同じことを伝える写真で、
 * 重ねて読み上げると文脈のない説明が3つ続いてしまうため。
 */
const heroPhotos = [
  {
    src: "/images/hero-01-departure.jpg",
    alt: "訪問へ出発する看護師",
    /*
     * 3:2 の写真を横長に切るため上下が落ちる。顔が切れない位置に寄せる。
     * 値は写真ごとの顔の高さから決めた（1枚目は上から11%、2枚目21%、3枚目32%）。
     * 2560px でも切れないほうに寄せてある。写真を差し替えたら測り直すこと。
     */
    position: "center 13%",
  },
  { src: "/images/hero-02-visit.jpg", alt: "", position: "center 32%" },
  { src: "/images/hero-03-team.jpg", alt: "", position: "center 52%" },
];

function Hero() {
  return (
    <div className="relative h-[clamp(520px,38vw,820px)] overflow-hidden rounded-b-panel max-[960px]:h-[400px]">
      {heroPhotos.map((photo, i) => (
        <div key={photo.src} className="hero-slide">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover"
            style={{ objectPosition: photo.position }}
          />
        </div>
      ))}

      <div aria-hidden="true" className="hero-scrim" />

      {/* 角を1箇所だけ落とした形。サイト共通のモチーフ。中にスクロールキューを置く */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 flex h-[118px] w-[118px] items-center justify-center rounded-tl-panel bg-blue max-[600px]:h-[84px] max-[600px]:w-[84px]"
      >
        <span className="scroll-cue max-[600px]:text-[8.5px]">Scroll</span>
      </div>

      {/* 600px以下はスクロールキュー（84px）の上に逃がす。
          横に避けると見出しの1行が入らず「看る。」だけ折り返すため */}
      <div className="absolute inset-x-0 bottom-[68px] max-[960px]:bottom-[40px] max-[600px]:bottom-[100px]">
        <div className="wrap">
          <span className="mb-1.5 block font-serif text-[40px] font-light italic leading-none tracking-[0.04em] text-blue max-[960px]:text-[27px]">
            {copy.heroEn}
          </span>
          {/* 2行目は11字。600px以下は (画面幅 - 左右32px) ÷ 11字 ÷ 1.05（字間.05em）
              に収まるところまで落として、1行で入るようにする。29pxが上限 */}
          <h1 className="text-[47px] leading-[1.65] max-[960px]:text-[29px] max-[600px]:text-[min(29px,calc(8.4vw_-_5.6px))]">
            {copy.heroHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section>
        <div className="wrap grid grid-cols-[440px_1fr] items-center gap-[76px] max-[960px]:grid-cols-1 max-[960px]:gap-[34px]">
          <div className="reveal relative">
            <Photo
              caption="写真｜事務所または訪問の様子（縦長）"
              className="h-[400px] rounded-panel max-[960px]:h-[230px]"
            />
            <span
              aria-hidden="true"
              className="absolute -right-[22px] -top-[22px] h-24 w-24 rounded-[50%_50%_0_50%] bg-blue-soft"
            />
          </div>
          <div className="reveal">
            <SectionHead
              eyebrow="About us"
              heading={
                <>
                  <span className="block">こころの不調から、</span>
                  <span className="block">在宅療養、看取りまで。</span>
                </>
              }
            />
            <p className="mt-6">{aboutLead}</p>
            <p className="mt-7">
              <Pill href="/about" variant="ghost">
                アプロについて
              </Pill>
            </p>
          </div>
        </div>
      </Section>

      {/* 特徴。TOPは3つだけ出す（残りは /service）。
          写真が用意できていないので、写真枠の代わりに大きな番号を置いて面をつくる。
          左カラムの sticky とカードのずらしは廃止した */}
      <section className="on-color mx-8 rounded-panel bg-blue pb-[118px] pt-[110px] max-[960px]:mx-4 max-[960px]:py-[70px]">
        <div className="wrap-panel max-[960px]:px-6">
          <div className="reveal">
            <Eyebrow className="!text-paper">Features</Eyebrow>
            <h2 className="text-paper">アプロの特徴</h2>
            <p className="mb-8 mt-5 text-[0.9375rem] text-[rgba(255,255,255,0.82)]">
              在宅で対応できる範囲であれば、お断りするケースは基本的にありません。まずお受けして、そこから考えます。
            </p>
            <Pill href="/service" variant="light">
              事業紹介を見る
            </Pill>
          </div>

          <ul className="mt-[52px] grid list-none grid-cols-3 gap-6 max-[960px]:mt-9 max-[960px]:grid-cols-1">
            {topFeatures.map((feature) => (
              <li key={feature.id} className="reveal">
                <a
                  href={`/service#${feature.id}`}
                  className="card-link flex h-full flex-col rounded-card bg-paper px-8 pb-[34px] pt-[30px]"
                >
                  {/* 下層ページの h1 と同じ目盛り。写真がないぶんここで大きさを持たせる */}
                  <span className="block font-en text-[2.375rem] leading-none tracking-[0.08em] text-blue">
                    {feature.no}
                  </span>
                  <span className="card-title mt-6 block font-heading text-[1.1875rem] font-medium leading-[1.6] text-blue-ink">
                    {feature.cardTitle.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                  <span className="mt-4 block text-[0.9375rem] text-ink-muted">{feature.lead}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PanelSection tone="mist">
        <div className="wrap-panel max-[960px]:px-6">
          <SectionHead eyebrow="Support" heading="こんなときに、ご相談ください" />
          <div className="mt-12 grid grid-cols-3 gap-6 max-[960px]:grid-cols-1">
            {cases.map((c) => (
              <div key={c.id} className="reveal rounded-card bg-paper px-7 pb-[30px] pt-[26px]">
                <h3 className="text-[1.1875rem]">
                  {c.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-3 text-[0.9375rem] text-ink-muted">{c.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </PanelSection>

      {/* 採用バナー。--sand を使うのはここの英字ラベルとボタンのみ */}
      <section className="on-color mx-8 rounded-panel bg-blue-ink max-[960px]:mx-4">
        <div className="wrap-panel grid grid-cols-[1fr_400px] items-center gap-[72px] max-[960px]:grid-cols-1 max-[960px]:gap-[34px] max-[960px]:px-6">
          <div className="reveal py-[100px] max-[960px]:pb-0 max-[960px]:pt-[60px]">
            <Eyebrow className="!text-sand">Recruit</Eyebrow>
            <h2 className="text-[1.875rem] text-paper max-[960px]:text-[1.375rem]">
              {copy.recruitHeadline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mb-[30px] mt-5 text-[0.9375rem] text-[rgba(255,255,255,0.75)]">{copy.recruitSub}</p>
            <Pill href="/recruit" variant="sand">
              採用情報を見る
            </Pill>
          </div>
          <Photo
            caption="写真｜スタッフ・事務所の様子"
            onColor
            className="reveal h-[290px] max-[960px]:mb-[60px] max-[960px]:h-[220px]"
          />
        </div>
      </section>

      <Contact />
    </>
  );
}
