import type { ReactNode } from "react";

/**
 * 行動指針（/about）のアイコン。番号の代わりに置く。
 *
 * 参照サイト（happywood.or.jp/vision）と同じで、写真を使わずアイコン左・本文右で並べる。
 * 塗りなしの一本線（`viewBox="0 0 24 24"` / 32px枠）で、共通モチーフ
 * （角を1箇所落とした形）の淡い青の面に載せる。図形そのものは足さない。
 */
const shapes: Record<string, ReactNode> = {
  /* 手のひらの上のハート。条件をつけずにお受けする */
  "01": (
    <>
      <path d="M12 12.2 8.1 8.4a2.75 2.75 0 1 1 3.9-3.9 2.75 2.75 0 1 1 3.9 3.9Z" />
      <path d="M4 13.6c0 3.5 3.6 6 8 6s8-2.5 8-6" />
    </>
  ),
  /* 同じ大きさの人がふたり。どちらのお宅にも同じように伺う */
  "02": (
    <>
      <circle cx="7.6" cy="8.8" r="2.5" />
      <path d="M3.8 19.2c0-2.6 1.7-4.4 3.8-4.4s3.8 1.8 3.8 4.4" />
      <circle cx="16.4" cy="8.8" r="2.5" />
      <path d="M12.6 19.2c0-2.6 1.7-4.4 3.8-4.4s3.8 1.8 3.8 4.4" />
    </>
  ),
  /* 破線を越えていく矢印。職種の境界で止まらない */
  "03": (
    <>
      <path d="M12 3.8v16.4" strokeDasharray="2.6 2.6" />
      <path d="M4.6 12h14.8" />
      <path d="m15.6 8.4 3.8 3.6-3.8 3.6" />
    </>
  ),
  /* 砂時計。件数を増やすより、一人にかける時間を残す */
  "04": (
    <>
      <path d="M7.6 3.8h8.8" />
      <path d="M7.6 20.2h8.8" />
      <path d="M8 3.8h8l-4 8.2Z" />
      <path d="M8 20.2h8l-4-8.2Z" />
    </>
  ),
  /* 前へ伸びる矢印。できない理由を探すより先に動く */
  "05": (
    <>
      <path d="m4.4 16.6 5.6-5.6 3.4 3.4 6.2-6.2" />
      <path d="M14.6 8.2h5v5" />
    </>
  ),
};

/**
 * 見出しが内容を伝えるので、アイコンは読み上げから外す。
 * 番号に対応する形がなければビルドを止める（原稿の差し替えで無音の欠けを出さないため）
 */
export function ValueIcon({ no }: { no: string }) {
  const shape = shapes[no];
  if (!shape) throw new Error(`value icon not found: ${no}`);

  return (
    <span
      aria-hidden="true"
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[50%_50%_50%_0] bg-blue-soft text-blue max-[960px]:h-14 max-[960px]:w-14"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 max-[960px]:h-7 max-[960px]:w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {shape}
      </svg>
    </span>
  );
}
