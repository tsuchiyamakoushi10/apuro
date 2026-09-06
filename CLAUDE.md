clau# CLAUDE.md

アプロ訪問看護ステーション コーポレートサイト。
このファイルはClaude Codeへの指示書。作業前に必ず `docs/spec.md` と `docs/reference/top-mockup-v3.html` を読むこと。

---

## 技術構成

- Next.js（App Router）/ TypeScript / Tailwind CSS
- デプロイ：Vercel
- CMSなし、静的サイト
- フォームはGoogleフォームへの外部リンク（別タブ）。フォーム機能は実装しない

## 絶対に守ること

1. **未確定の値をコンポーネントに直書きしない。** すべて `src/config/site.ts` に集約する。
2. **`overflow-x: hidden` を body に使わない。** `overflow-x: clip` を使う。`hidden` だと特徴セクションの `position: sticky` が効かなくなる。
3. **原稿はすべて `docs/アプロ訪問看護_HP原稿.xlsx` が正。** 文言を勝手に書き換えたり、要約したり、「〜します！」のような調子に直したりしない。改行位置も原稿の意図を尊重する。
4. **モックにない装飾を足さない。** 影、グラデーション、ホバーで浮き上がるカード、セクションごとのフェードイン。いずれも使わない。
5. 採用ページを実装する際は `docs/spec.md` の職業安定法チェックリストを必ず確認する。

## デザイントークン

```css
--paper:#FFFFFF;    /* ベース */
--mist:#F4F8FA;     /* 淡い面・フッター */
--blue:#2A6FA8;     /* プライマリ。ベタ面・ボタン */
--blue-deep:#1B4E7A;
--blue-ink:#123A5C; /* 見出し */
--blue-soft:#DCEAF3;
--sand:#DFC9A5;     /* 採用セクションのみ */
--ink:#2B3740;      /* 本文。純黒は使わない */
--ink-muted:#69777F;
```

- 角丸：カード `28px` / 大きい写真・色面 `40px` / ボタンは `999px` のピル型
- 影は使わない。面の分離は背景色と角丸で行う
- 色を敷いた面（特徴・採用・フッター）は左右に `32px` の余白を残して角丸にする

## タイポグラフィ

| 用途 | フォント |
|---|---|
| 見出し | Zen Kaku Gothic New 500 |
| 本文 | Noto Sans JP 400 |
| 英字ラベル | Jost 400 / `letter-spacing:.16em` |
| ヒーローの英字 | Cormorant Garamond 300 italic |

本文は `line-height:1.95` / `letter-spacing:.03em` / `max-width:34em`。

## 装飾のルール

角を1箇所だけ落とした形（`border-radius:50% 50% 50% 0`）をサイト共通のモチーフにする。英字ラベルの前のマーク、リストのマーカー、写真に重なる装飾すべてこの形。それ以外の図形を追加しない。

## ページ構成

| パス | 内容 | 原稿シート |
|---|---|---|
| `/` | ヒーロー／アプロについて／特徴／こんなときに／採用／問い合わせ | 01・04 |
| `/about` | ミッション・ビジョン・バリュー／代表挨拶／会社概要 | 02・03 |
| `/service` | サービス概要／私たちが行うこと／医療処置／24時間対応／エリア／ご利用の流れ | 04 |
| `/recruit` | 採用理念／人物像／働き方／教育／福利厚生／正直に伝えること／募集要項 | 05・06 |
| `/privacy` | プライバシーポリシー | 別途作成 |

代表挨拶の本文は `docs/代表挨拶原稿.md`（クライアント確認待ち）。

## 特徴セクション（TOPの中核）

左カラムを `position:sticky; top:150px` で固定し、右カラムのカード6枚がスクロールに連動して上がる。JavaScriptは使わない。カードは偶数番目を `translateX(-38px)` でずらす。960px以下では `position:static` にしてずらしも解除する。

## 実装順

1. `src/config/site.ts` と共通レイアウト（ヘッダー・フッター）
2. `/about` — 原稿が最も揃っている
3. `/service`
4. `/recruit`
5. `/` — 下層の抜粋で構成されるため最後
6. `/privacy`

## 品質の下限

- 960px以下のレイアウト崩れがないこと
- キーボードフォーカスが見えること
- `prefers-reduced-motion` に対応すること
- 電話番号は `tel:` リンクにすること
- 画像には意味のある `alt` を入れること（装飾は空 `alt`）

## 公開前

`docs/spec.md` の公開前チェックリストを実行する。特に `site.ts` に `【調整中】` が残った状態で本番公開しないこと。

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
