import type { ReactNode } from "react";
import { Eyebrow } from "./ui";

/** 通常セクション。白地 */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-[118px] max-[960px]:py-[70px] ${className}`}>
      {children}
    </section>
  );
}

/**
 * 色を敷いた面。左右に 32px の余白を残して角丸にする。
 * tone="mist" は淡い面、"blue" と "ink" は反転文字。
 */
export function PanelSection({
  id,
  tone,
  children,
  className = "",
}: {
  id?: string;
  tone: "mist" | "blue" | "ink" | "sand";
  children: ReactNode;
  className?: string;
}) {
  const bg = {
    mist: "bg-mist",
    blue: "bg-blue on-color",
    ink: "bg-blue-ink on-color",
    sand: "bg-sand",
  }[tone];

  return (
    <section
      id={id}
      className={`mx-8 rounded-panel py-[118px] max-[960px]:mx-4 max-[960px]:py-[70px] ${bg} ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  heading,
  className = "",
}: {
  eyebrow: string;
  heading: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{heading}</h2>
    </div>
  );
}

/**
 * ページ内の目次。節が多いページの見出しの下に置く。
 *
 * 節ごとに `id` を振ってあるので、そこへ飛ばすだけ。
 * 追従はさせない。ヘッダーが1300px未満で2段になり、追従させると画面が狭くなるため。
 * 飛んだ先が隠れないよう、`html` に `scroll-padding-top` を入れてある（globals.css）
 */
export function SectionNav({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="このページの目次" className="border-b border-blue-soft">
      <div className="wrap flex flex-wrap gap-x-9 gap-y-3 py-5 text-[0.9375rem] max-[960px]:gap-x-6 max-[960px]:py-4">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="link-hover text-blue-ink">
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/** ページ上部の見出し。下層ページ共通 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div className="border-b border-blue-soft">
      <div className="wrap py-[86px] max-[960px]:py-[52px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-[2.375rem] leading-[1.65] max-[960px]:text-[1.625rem]">{title}</h1>
        {lead ? <div className="mt-6 text-ink-muted">{lead}</div> : null}
      </div>
    </div>
  );
}
