import type { ReactNode } from "react";

/**
 * アイコン。写真を使わない節で面をつくるために置いている。
 *
 * 塗りなしの一本線（`viewBox="0 0 24 24"`）で、共通モチーフ
 * （角を1箇所落とした形）の淡い青の面に載せる。図形そのものは足さない。
 * 大きさは2種類だけ。節の見出しに並ぶものは 64px、項目に並ぶものは 48px。
 */
function IconChip({ children, small = false }: { children: ReactNode; small?: boolean }) {
  const chip = small
    ? "h-12 w-12"
    : "h-16 w-16 max-[960px]:h-14 max-[960px]:w-14";
  const glyph = small ? "h-6 w-6" : "h-8 w-8 max-[960px]:h-7 max-[960px]:w-7";

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-[50%_50%_50%_0] bg-blue-soft text-blue ${chip}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={glyph}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

/** 行動指針（/about）。番号の代わりに置く */
const valueShapes: Record<string, ReactNode> = {
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

/** 私たちが行うこと（/service）。原稿の8項目に1つずつ */
const serviceShapes: Record<string, ReactNode> = {
  /* 脈。観察と早期発見 */
  symptom: <path d="M3 12h3.6l2-5 3 10 2.4-5H21" />,
  /* カプセル。服薬の援助 */
  medicine: (
    <>
      <rect x="3.2" y="8.6" width="17.6" height="6.8" rx="3.4" transform="rotate(-45 12 12)" />
      <path d="m9.6 9.6 4.8 4.8" />
    </>
  ),
  /* 家。暮らしそのものを支える */
  daily: <path d="M3.8 10.4 12 3.8l8.2 6.6v9.8H3.8Z" />,
  /* 重なる2つの輪。主治医・関連機関とつながる */
  liaison: (
    <>
      <circle cx="8.8" cy="12" r="5.2" />
      <circle cx="15.2" cy="12" r="5.2" />
    </>
  ),
  /* かばん。就労支援・日中活動 */
  social: (
    <>
      <rect x="3.2" y="7.6" width="17.6" height="12.6" rx="2.2" />
      <path d="M8.8 7.6V6.2a1.8 1.8 0 0 1 1.8-1.8h2.8a1.8 1.8 0 0 1 1.8 1.8v1.4" />
    </>
  ),
  /* 吹き出し。ご家族との面談 */
  family: (
    <>
      <rect x="3.4" y="4.6" width="17.2" height="11.2" rx="2.6" />
      <path d="M7.6 15.8v3.6l4-3.6" />
    </>
  ),
  /* 書類。窓口やサービスのご案内 */
  information: (
    <>
      <path d="M5 4.4h8.2L18 9.2v10.4H5Z" />
      <path d="M13.2 4.4v4.8H18" />
      <path d="M8.2 13.2h6.6M8.2 16.4h4.4" />
    </>
  ),
  /* 十字。在宅で必要な医療処置 */
  treatment: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
};

/**
 * 見出しが内容を伝えるので、アイコンは読み上げから外す。
 * 対応する形がなければビルドを止める（原稿の差し替えで無音の欠けを出さないため）
 */
export function ValueIcon({ no }: { no: string }) {
  const shape = valueShapes[no];
  if (!shape) throw new Error(`value icon not found: ${no}`);
  return <IconChip>{shape}</IconChip>;
}

export function ServiceIcon({ id }: { id: string }) {
  const shape = serviceShapes[id];
  if (!shape) throw new Error(`service icon not found: ${id}`);
  return <IconChip small>{shape}</IconChip>;
}
