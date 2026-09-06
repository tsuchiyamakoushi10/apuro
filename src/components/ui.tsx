import Link from "next/link";
import type { ReactNode } from "react";
import { isTbd } from "@/config/site";

/** 英字ラベル。前のマークはサイト共通のモチーフ */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

type PillVariant = "solid" | "ghost" | "light" | "sand";

const pillClass: Record<PillVariant, string> = {
  solid: "pill",
  ghost: "pill pill-ghost",
  light: "pill pill-light",
  sand: "pill pill-sand",
};

export function Pill({
  href,
  children,
  variant = "solid",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: PillVariant;
  external?: boolean;
}) {
  if (external) {
    return (
      <a className={pillClass[variant]} href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only">（別タブで開きます）</span>
      </a>
    );
  }
  return (
    <Link className={pillClass[variant]} href={href}>
      {children}
    </Link>
  );
}

/**
 * 写真のプレースホルダ。素材が入り次第 next/image に差し替える。
 * caption は「どんな写真を入れるか」の指示であって、本番の alt ではない。
 */
export function Photo({
  caption,
  className = "",
  onColor = false,
}: {
  caption: ReactNode;
  className?: string;
  onColor?: boolean;
}) {
  return (
    <div className={`ph ${onColor ? "ph-on-color" : ""} ${className}`} role="img" aria-label="写真は準備中です">
      <span aria-hidden="true">{caption}</span>
    </div>
  );
}

/** 未確定値の表示。確定していればそのまま出す */
export function Tbd({ value }: { value: string }) {
  if (!isTbd(value)) return <>{value}</>;
  return <span className="tbd">{value}</span>;
}

/** 原稿の改行をそのまま出す。文言も改行位置も原稿が正 */
export function Lines({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={className}>
      {text.split("\n").map((line, i) =>
        line === "" ? (
          <span key={i} className="block h-[0.95em]" />
        ) : (
          <span key={i} className="block">
            {line}
          </span>
        ),
      )}
    </p>
  );
}

/** 段落のあいだに空行がある原稿を、段落ごとに分けて出す */
export function Paragraphs({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text
        .trim()
        .split(/\n\s*\n/)
        .map((block, i) => (
          <Lines key={i} text={block} className={`${i > 0 ? "mt-7" : ""} ${className}`} />
        ))}
    </>
  );
}
