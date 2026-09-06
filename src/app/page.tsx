import { Contact } from "@/components/Contact";
import { PanelSection, Section, SectionHead } from "@/components/Section";
import { Eyebrow, Photo, Pill } from "@/components/ui";
import { copy } from "@/config/site";
import { cases, features } from "@/content/service";

const aboutLead =
  "アプロ訪問看護ステーションは、国分寺市を中心に、こころの不調を抱えた方への訪問看護から高齢者の在宅療養、そして看取りまでを担う訪問看護ステーションです。どんな状況の方でも、まずはご相談ください。";

function Hero() {
  return (
    <div className="relative h-[560px] overflow-hidden rounded-b-panel max-[960px]:h-[400px]">
      <Photo
        caption={
          <>
            写真｜メインビジュアル（横長・1920×1080程度）
            <br />
            訪問先での看護師とご利用者、または自転車での移動シーン
          </>
        }
        className="h-full !items-start !rounded-b-panel !rounded-t-none border-t-0 pt-10 text-[12.5px]"
      />

      {/* 角を1箇所だけ落とした形。サイト共通のモチーフ */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-[118px] w-[118px] rounded-tl-panel bg-blue max-[600px]:h-[84px] max-[600px]:w-[84px] after:absolute after:left-1/2 after:top-1/2 after:h-[34px] after:w-[34px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-[rgba(255,255,255,0.55)] after:content-[''] max-[600px]:after:h-[24px] max-[600px]:after:w-[24px]"
      />

      <div className="absolute inset-x-0 bottom-24 max-[960px]:bottom-[52px]">
        <div className="wrap max-[600px]:pr-[92px]">
          <span className="mb-1.5 block font-serif text-[40px] font-light italic leading-none tracking-[0.04em] text-blue max-[960px]:text-[27px]">
            {copy.heroEn}
          </span>
          <h1 className="text-[47px] leading-[1.65] max-[960px]:text-[29px]">
            {copy.heroHeadline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 text-[14.5px] leading-[2] text-ink-muted">{copy.heroSub}</p>
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
          <div className="relative">
            <Photo
              caption="写真｜事務所または訪問の様子（縦長）"
              className="h-[400px] rounded-panel max-[960px]:h-[230px]"
            />
            <span
              aria-hidden="true"
              className="absolute -right-[22px] -top-[22px] h-24 w-24 rounded-[50%_50%_0_50%] bg-blue-soft"
            />
          </div>
          <div>
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

      {/* 特徴。左カラムを sticky で固定し、右カラムのカードがスクロールに連動して上がる */}
      <section className="on-color mx-8 rounded-panel bg-blue pb-[118px] pt-[110px] max-[960px]:mx-4 max-[960px]:py-[70px]">
        <div className="wrap-panel grid grid-cols-[1fr_420px] items-start gap-[90px] max-[960px]:grid-cols-1 max-[960px]:gap-[34px] max-[960px]:px-6">
          <div className="sticky top-[150px] max-[960px]:static">
            <Eyebrow className="!text-paper">Features</Eyebrow>
            <h2 className="text-paper">アプロの特徴</h2>
            <p className="mb-8 mt-5 text-[14.5px] text-[rgba(255,255,255,0.82)]">
              在宅で対応できる範囲であれば、お断りするケースは基本的にありません。まずお受けして、そこから考えます。
            </p>
            <Pill href="/service" variant="light">
              事業紹介を見る
            </Pill>
          </div>

          <ul className="flex list-none flex-col gap-[26px]">
            {features.map((feature) => (
              <li
                key={feature.id}
                className="rounded-card bg-paper px-[18px] pb-[26px] pt-[18px] even:-translate-x-[38px] max-[960px]:even:translate-x-0"
              >
                <a href={`/service#${feature.id}`} className="block">
                  <Photo
                    caption={feature.photo}
                    className="mb-5 h-[180px] !rounded-[20px] !bg-[rgba(42,111,168,0.07)]"
                  />
                  <span className="block px-2 font-en text-[13px] tracking-[0.12em] text-blue">
                    {feature.no}
                  </span>
                  <span className="mt-1.5 block px-2 font-heading text-[17px] font-medium leading-[1.6] text-blue-ink">
                    {feature.cardTitle.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
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
              <div key={c.id} className="rounded-card bg-paper px-7 pb-[30px] pt-[26px]">
                <h3 className="text-[17px]">
                  {c.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-3 text-[13.5px] text-ink-muted">{c.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </PanelSection>

      {/* 採用バナー。--sand を使うのはここの英字ラベルとボタンのみ */}
      <section className="on-color mx-8 rounded-panel bg-blue-ink max-[960px]:mx-4">
        <div className="wrap-panel grid grid-cols-[1fr_400px] items-center gap-[72px] max-[960px]:grid-cols-1 max-[960px]:gap-[34px] max-[960px]:px-6">
          <div className="py-[100px] max-[960px]:pb-0 max-[960px]:pt-[60px]">
            <Eyebrow className="!text-sand">Recruit</Eyebrow>
            <h2 className="text-[27px] text-paper max-[960px]:text-[22px]">
              {copy.recruitHeadline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mb-[30px] mt-5 text-[14px] text-[rgba(255,255,255,0.75)]">{copy.recruitSub}</p>
            <Pill href="/recruit" variant="sand">
              採用情報を見る
            </Pill>
          </div>
          <Photo
            caption="写真｜スタッフ・事務所の様子"
            onColor
            className="h-[290px] max-[960px]:mb-[60px] max-[960px]:h-[220px]"
          />
        </div>
      </section>

      <Contact />
    </>
  );
}
