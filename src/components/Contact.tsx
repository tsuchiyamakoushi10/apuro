import Link from "next/link";
import { site, isTbd } from "@/config/site";
import { Section } from "./Section";

/** 電話を左、フォームを右。フォームはGoogleフォームへの外部リンク */
export function Contact({ id = "contact" }: { id?: string }) {
  const formReady = !isTbd(site.forms.contact);

  return (
    <Section id={id}>
      <div className="wrap">
        <div className="grid grid-cols-2 gap-6 max-[960px]:grid-cols-1">
          <a
            className="contact-card reveal flex items-center justify-between gap-5 rounded-card bg-mist px-[46px] py-11 max-[960px]:px-7 max-[960px]:py-8"
            href={site.telHref}
          >
            <span>
              <span className="block font-heading text-[1.1875rem] text-blue-ink">お電話でのご相談</span>
              <span className="block font-en text-[1.6875rem] leading-[1.3] text-blue-ink">{site.tel}</span>
              <span className="mt-1 block text-[0.75rem] text-ink-muted">
                {site.hours}／{site.oncall}
              </span>
            </span>
            <Arrow />
          </a>

          <FormCard
            href={site.forms.contact}
            ready={formReady}
            label="フォームでのご相談"
            lines={[
              "24時間受付／2〜3営業日以内にご返信します",
              "ご本人・ご家族・ケアマネジャーの方、どなたからでも",
            ]}
          />
        </div>

        <p className="mx-auto mt-6 text-center text-[0.75rem] text-ink-muted">
          送信の前に
          <Link href="/privacy" className="link-hover border-b border-blue-soft">
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>
      </div>
    </Section>
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
        <span className="block font-heading text-[1.1875rem] text-blue-ink">{label}</span>
        <span className="mt-2 block text-[0.75rem] text-ink-muted">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
        {!ready ? <span className="mt-2 block text-[0.75rem] tbd">{href}</span> : null}
      </span>
      {ready ? <Arrow /> : null}
    </>
  );

  // 未確定のうちはリンクにならないため、ホバーの反応も付けない
  const className = `reveal flex items-center justify-between gap-5 rounded-card bg-mist px-[46px] py-11 max-[960px]:px-7 max-[960px]:py-8 ${
    ready ? "contact-card" : ""
  }`;

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
      className="relative h-[52px] w-[52px] flex-shrink-0 rounded-full bg-blue after:absolute after:left-[45%] after:top-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:border-r-[1.5px] after:border-t-[1.5px] after:border-white after:content-['']"
    />
  );
}
