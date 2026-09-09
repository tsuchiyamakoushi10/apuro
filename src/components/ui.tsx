import Image from "next/image";
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
 * 実写真。高さと角丸は className で渡す。
 *
 * 写真のプレースホルダ（`Photo`）は、全部の枠に写真が入ったので外した。
 * 枠だけ出す作りが残っているのはアクセスマップだけ（`.ph` / Contact.tsx）
 */
export function Picture({
  src,
  alt,
  className = "",
  sizes,
  position = "center",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  /** 枠の実寸。next/image が配信する解像度が決まる */
  sizes: string;
  /** 3:2 の写真を縦長に切る枠で、人物が切れるときだけ渡す */
  position?: string;
  /** ページ最初の1枚だけ。遅延読み込みを外して表示の遅れをなくす */
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/**
 * 主写真の後ろに敷く写真。同じ枠に同じ大きさで重ね、角度だけを変える。
 * 参照サイト（minoh-greenvilla.jp）の top_about と同じ作りで、
 * 影ではなく写真そのものを重ねてカードの束のように見せている。
 * 装飾なので alt は空にし、読み上げから外す。角度は .photo-fan-* で渡す。
 */
export function PictureBack({
  src,
  className = "",
  sizes,
}: {
  src: string;
  className?: string;
  /** 主写真と同じ値を渡す。同じ枠に敷くため */
  sizes: string;
}) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden opacity-50 ${className}`}>
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/** 未確定値の表示。確定していればそのまま出す */
export function Tbd({ value }: { value: string }) {
  if (!isTbd(value)) return <>{value}</>;
  return <span className="tbd">{value}</span>;
}

/**
 * 原稿の改行をそのまま出す。文言も改行位置も原稿が正。
 *
 * reflow を渡すと 960px 以下で改行位置を捨てて流し込む。
 * 原稿の1行は40字前後あり、スマホの幅では途中で折り返して
 * 2〜3字だけが次の行に残る。原稿の改行を守るほうがかえって読みにくいため。
 * 募集要項の表のように、改行が値の区切りになっている箇所では渡さない。
 */
export function Lines({
  text,
  className = "",
  reflow = false,
}: {
  text: string;
  className?: string;
  reflow?: boolean;
}) {
  const lineClass = reflow ? "block max-[960px]:inline" : "block";

  return (
    <p className={className}>
      {text.split("\n").map((line, i) =>
        line === "" ? (
          <span key={i} className="block h-[0.95em]" />
        ) : (
          <span key={i} className={lineClass}>
            {line}
          </span>
        ),
      )}
    </p>
  );
}

/** 段落のあいだに空行がある原稿を、段落ごとに分けて出す。本文なので既定で流し込む */
export function Paragraphs({
  text,
  className = "",
  reflow = true,
}: {
  text: string;
  className?: string;
  reflow?: boolean;
}) {
  return (
    <>
      {text
        .trim()
        .split(/\n\s*\n/)
        .map((block, i) => (
          <Lines
            key={i}
            text={block}
            reflow={reflow}
            className={`${i > 0 ? "mt-7" : ""} ${className}`}
          />
        ))}
    </>
  );
}
