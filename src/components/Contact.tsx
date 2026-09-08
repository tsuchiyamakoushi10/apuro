import Link from "next/link";
import { site, isTbd } from "@/config/site";
import { Section, SectionHead } from "./Section";
import { Pill, Tbd } from "./ui";

/**
 * ご相談の窓口を3つ並べる。電話・お問い合わせフォーム・採用エントリー。
 * フォームはどちらもGoogleフォームへの外部リンク。その下にアクセスマップを置く。
 */
export function Contact({ id = "contact" }: { id?: string }) {
  return (
    <Section id={id}>
      <div className="wrap">
        <div className="grid grid-cols-3 gap-6 max-[960px]:grid-cols-1">
          <TelCard label="お電話でのご相談" note={`${site.hours}／${site.oncall}`} />

          <FormCard
            href={site.forms.contact}
            ready={!isTbd(site.forms.contact)}
            label="お問い合わせフォーム"
            lines={[
              "24時間受付／2〜3営業日以内にご返信します",
              "ご本人・ご家族・ケアマネジャーの方、どなたからでも",
            ]}
          />

          <FormCard
            href={site.forms.recruit}
            ready={!isTbd(site.forms.recruit)}
            label="採用エントリー"
            lines={["24時間受付／2〜3営業日以内にご返信します", "ご質問だけのご連絡でも構いません"]}
          />
        </div>

        <p className="mx-auto mt-6 text-center text-[0.84375rem] text-ink-muted">
          送信の前に
          <Link href="/privacy" className="link-hover border-b border-blue-soft">
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>

        <Access />
      </div>
    </Section>
  );
}

/**
 * カードは3枚とも同じ作り。3列に収めるため、左右の余白は 46px から 32px に、
 * 見出しは 1.4375rem から 1.1875rem（特徴・こんなときにのカードと同じ目盛り）に落とした。
 * 「お電話でのご相談」が矢印に押されて2行に折れるため
 */
const cardClass =
  "contact-card reveal flex items-center justify-between gap-4 rounded-card bg-mist px-8 py-9 max-[960px]:px-7 max-[960px]:py-8";

/**
 * アクセス。Googleマップの埋め込み。
 * 埋め込みURLが未確定のあいだは枠だけ出す。
 */
function Access() {
  const mapReady = !isTbd(site.mapEmbedSrc);

  return (
    <div className="mt-[92px] max-[960px]:mt-[60px]">
      <SectionHead eyebrow="Access" heading="アクセス" />

      <div className="mt-9 grid grid-cols-[1fr_360px] gap-[56px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
        {mapReady ? (
          <div className="reveal h-[380px] overflow-hidden rounded-panel max-[960px]:h-[240px]">
            <iframe
              src={site.mapEmbedSrc}
              title={`${site.name}の地図`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        ) : (
          <div
            className="ph reveal h-[380px] rounded-panel max-[960px]:h-[240px]"
            role="img"
            aria-label="地図は準備中です"
          >
            <span aria-hidden="true">
              Googleマップ｜埋め込みURLが入り次第、地図に切り替わる
              <span className="tbd mt-2 block">{site.mapEmbedSrc}</span>
            </span>
          </div>
        )}

        <div className="reveal">
          <dl className="border-t border-blue-soft">
            {[
              { k: "所在地", v: <Tbd value={site.address} /> },
              { k: "アクセス", v: <Tbd value={site.access} /> },
              { k: "TEL", v: <a href={site.telHref}>{site.tel}</a> },
              { k: "営業時間", v: `${site.hours}／${site.oncall}` },
            ].map((row) => (
              <div key={row.k} className="border-b border-blue-soft py-4">
                <dt className="font-heading text-[0.875rem] text-blue-ink">{row.k}</dt>
                <dd className="mt-1 text-[0.9375rem]">{row.v}</dd>
              </div>
            ))}
          </dl>

          {mapReady ? (
            <p className="mt-7">
              <Pill href={site.mapLink} variant="ghost" external>
                Googleマップで開く
              </Pill>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** 電話のカード。TOP・事業紹介のご相談と、採用の応募窓口で同じものを使う */
export function TelCard({ label, note }: { label: string; note: string }) {
  return (
    <a className={cardClass} href={site.telHref}>
      <span>
        <span className="block font-heading text-[1.1875rem] leading-[1.6] text-blue-ink">{label}</span>
        {/* 3列に入れるため、2列だった頃の 1.875rem から一段落としている */}
        <span className="block font-en text-[1.5rem] leading-[1.4] text-blue-ink">{site.tel}</span>
        <span className="mt-1 block text-[0.84375rem] text-ink-muted">{note}</span>
      </span>
      <Arrow />
    </a>
  );
}

export function FormCard({
  href,
  ready,
  label,
  lines,
}: {
  href: string;
  ready: boolean;
  label: string;
  lines: string[];
}) {
  const inner = (
    <>
      <span>
        <span className="block font-heading text-[1.1875rem] leading-[1.6] text-blue-ink">{label}</span>
        <span className="mt-2 block text-[0.84375rem] text-ink-muted">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
        {!ready ? <span className="tbd mt-2 block text-[0.84375rem]">{href}</span> : null}
      </span>
      {ready ? <Arrow /> : null}
    </>
  );

  // 未確定のうちはリンクにならないため、ホバーの反応も付けない
  const className = ready ? cardClass : cardClass.replace("contact-card ", "");

  // URL が未確定のうちはリンクにしない
  if (!ready) return <div className={className}>{inner}</div>;

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {inner}
      <span className="sr-only">（別タブで開きます）</span>
    </a>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="arrow relative h-[52px] w-[52px] flex-shrink-0 rounded-full bg-blue after:absolute after:left-[45%] after:top-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:border-r-[1.5px] after:border-t-[1.5px] after:border-white after:content-['']"
    />
  );
}
