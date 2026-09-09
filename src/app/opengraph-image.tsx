import { ImageResponse } from "next/og";
import { copy, site } from "@/config/site";

export const alt = `${site.name}｜国分寺市の訪問看護`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OGP画像。ロゴタイプ＋キャッチの組版で作る（docs/spec.md 7章）。
 * 装飾は角を1箇所だけ落とした共通モチーフのみ。影・グラデーションは使わない。
 */

const headline = copy.heroHeadline.join("");
const footline = `${site.name}　${site.areas.join("・")}`;

/** Google Fonts から woff を取る。satori は woff2 を読めないため UA を指定する */
const LEGACY_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.8";

async function loadFont(family: string, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&text=${encodeURIComponent(text)}`,
    { headers: { "User-Agent": LEGACY_UA } },
  ).then((res) => res.text());

  const src = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
  if (!src) throw new Error(`font not found: ${family}`);

  return fetch(src).then((res) => res.arrayBuffer());
}

export default async function Image() {
  // フォントが取れなくても組版だけは出す。next/og の既定フォントに落ちる
  let fonts: { name: string; data: ArrayBuffer; weight: 300 | 400 | 500; style: "normal" | "italic" }[] = [];
  try {
    const [zenKaku, jost, cormorant] = await Promise.all([
      loadFont("Zen Kaku Gothic New:wght@500", headline + footline),
      loadFont("Jost:wght@400", site.nameEn),
      loadFont("Cormorant Garamond:ital,wght@1,300", copy.heroEn),
    ]);
    fonts = [
      { name: "Zen Kaku Gothic New", data: zenKaku, weight: 500, style: "normal" },
      { name: "Jost", data: jost, weight: 400, style: "normal" },
      { name: "Cormorant Garamond", data: cormorant, weight: 300, style: "italic" },
    ];
  } catch {
    fonts = [];
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          background: "#FFFFFF",
          padding: "0 92px",
          fontFamily: "Zen Kaku Gothic New",
        }}
      >
        {/* 共通モチーフ。角を1箇所だけ落とした形 */}
        <div
          style={{
            position: "absolute",
            top: -70,
            right: -70,
            width: 300,
            height: 300,
            borderRadius: "50% 50% 50% 0",
            background: "#DCEAF3",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 150,
            height: 150,
            borderTopLeftRadius: 40,
            background: "#2A6FA8",
          }}
        />

        <div
          style={{
            fontFamily: "Jost",
            fontSize: 20,
            letterSpacing: "0.3em",
            color: "#2A6FA8",
          }}
        >
          {site.nameEn}
        </div>

        <div
          style={{
            marginTop: 30,
            fontFamily: "Cormorant Garamond",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 44,
            color: "#2A6FA8",
          }}
        >
          {copy.heroEn}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 14,
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: "0.05em",
            lineHeight: 1.55,
            color: "#123A5C",
          }}
        >
          {copy.heroHeadline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div
          style={{
            marginTop: 44,
            paddingTop: 26,
            borderTop: "1px solid #DCEAF3",
            fontSize: 22,
            letterSpacing: "0.06em",
            color: "#69777F",
          }}
        >
          {footline}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
