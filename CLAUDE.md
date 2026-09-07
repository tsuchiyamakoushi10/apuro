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
2. **`overflow-x: hidden` を body に使わない。** `overflow-x: clip` を使う。`hidden` だとヘッダーと `/about` の `position: sticky` が効かなくなる。
3. **原稿はすべて `docs/アプロ訪問看護_HP原稿.xlsx` が正。** 文言を勝手に書き換えたり、要約したり、「〜します！」のような調子に直したりしない。改行位置も原稿の意図を尊重する。
4. **モックにない装飾を足さない。** 影とグラデーションは使わない。ホバーでカードを浮き上がらせない（`translateY` も影も付けない）。動きは「モーション」の節に書いたものだけにする。
   カードを8px動かす `.offset-card` は例外で、これは浮き上がりではなく、後ろに敷いたベタ面にカードが重なる動き（参照：umicahi.com）。影は使っていない。
   例外はヒーローの `.hero-scrim` だけ。実写真の上で見出しが人物に重なって読めなくなるため、可読性のために置いている。装飾ではないので消さないこと。
5. 採用ページを実装する際は `docs/spec.md` の職業安定法チェックリストを必ず確認する。

## デザイントークン

```css
--paper:#FFFFFF;    /* ベース */
--mist:#ECF6F9;     /* 淡い面・フッター */
--blue:#0E7C9C;     /* プライマリ。ベタ面・ボタン。白文字で 4.79:1 */
--blue-deep:#0A6480;
--blue-ink:#0F3F52; /* 見出し */
--blue-soft:#DDF0F0;
--sand:#DFC9A5;     /* 採用セクションのみ */
--ink:#2B3740;      /* 本文。純黒は使わない */
--ink-muted:#647279; /* 淡い面の上で 4.5:1 を切らない濃さ。薄くしない */
```

- 角丸：カード `28px` / 大きい写真・色面 `40px` / ボタンは `999px` のピル型
- 影は使わない。面の分離は背景色と角丸で行う
- 色を敷いた面（特徴・採用・フッター）は左右に `32px` の余白を残して角丸にする
- コンテンツ幅は `1160px` / 左右 `32px`（`.wrap`）。ヘッダーだけ1300px以上で `1440px` / 左右 `40px`（`.wrap-header`）
- ヘッダーのナビと電話番号は **1300px未満で畳む**（サイト全体のブレークポイントは960px。ここだけ例外）。
  ロゴ256px＋ナビ339px＋電話・ボタン541px＋余白で1行に1197px要り、1160pxのコンテナに入らないため。
  畳んだ先は `<details>` の MENU で、電話番号もその中に入っている。
  ヘッダーの文字サイズを変えたらこの数字が動く。Chromiumで測り直してブレークポイントを合わせること

## タイポグラフィ

| 用途 | フォント |
|---|---|
| 見出し | Zen Maru Gothic 500 |
| 本文 | Noto Sans JP 400 |
| 英字ラベル | Jost 400 / `letter-spacing:.16em` |
| ヒーローの英字 | Cormorant Garamond 300 italic |

本文は `line-height:1.95` / `letter-spacing:.03em` / `max-width:34em`。

**文字サイズは `rem` で書く。`px` で書かない。** 961px以上で `html { font-size: 113% }` にして
PCだけ一段大きくしている（本文15px→17px、h2 30px→34px、h3 23px→26px）。`px` で書くと追従しない。
`rem` に直すときは16で割る（15px → `0.9375rem`）。
例外はヒーローの文字とヘッダーのロゴで、ここは意図的に `px` のまま据え置いている。

モックの値がPCでも小さかったため、基準値そのものをモックの目盛りで一段上げてある。
10〜14.5px にばらついていた小さい文字を 13 / 13.5 / 14 / 15px の4段に整理し、
h3 は 19px を 23px に、h2 は 29px を 30px にした。
基準値を上げているのでスマホ（960px以下）も同じぶん大きい。
下層ページの h1（38px / スマホ26px）だけは元から大きいので据え置いた。
サイズを足すときはこの目盛りに乗せる。中間の値を新しく作らない。

## モーション

参照サイトに合わせて動きを入れている。追加するときはこの範囲を守る。

| 対象 | 動き |
|---|---|
| ヒーローの写真 | 3枚を18秒で1周するクロスフェード。ゆっくり縮小 |
| スクロールキュー | ヒーロー右下の青面の中で上下に揺れる |
| セクション・カード | スクロールで下から22px上がりながら現れる（`.reveal`） |
| ボタン・リンク・カード | ホバーで色が変わる。カード内の写真は 1.03 倍まで寄る |
| `.offset-card` | ホバーで8px右下へ動き、後ろのベタ面に重なる |

**守ること**

- 登場アニメーションは `animation-timeline: view()` のスクロール駆動で書く。JavaScriptは使わない
- `@supports (animation-timeline: view())` で囲む。非対応ブラウザでは最初から表示されたままにする
- 動くものはすべて `@media (prefers-reduced-motion: no-preference)` の中に置く。指定があるときは一切動かさず、ヒーローは1枚目のまま、`.reveal` は最初から不透明にする
- `.reveal` の移動は `transform` ではなく `translate` プロパティを使う。カードのずらし（`translateX`）と衝突させないため
- `position: sticky` の要素の祖先に `.reveal` を付けない。`translate` が包含ブロックを作って sticky が壊れる

## 装飾のルール

角を1箇所だけ落とした形（`border-radius:50% 50% 50% 0`）をサイト共通のモチーフにする。英字ラベルの前のマーク、リストのマーカー、特徴カードの番号バッジ、写真に重なる装飾すべてこの形。それ以外の図形を追加しない。

カードの後ろに、同じ角丸の面を8pxずらして敷く（`.offset-card`）。影ではなくベタ面で、
ホバーするとカードがその面に重なるところまで動く。面の色は `--offset-face` で敷く側から渡す
（青面の上では白の22%、淡い面の上では `--blue-soft`）。参照：umicahi.com

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

青ベタ面の上に、見出しブロックを1カラムで置き、その下に白いカードを横3列。960px以下は縦積み。

TOPに出すのは6項目のうち **01・02・05 の3つだけ**（`topFeatures`）。残りは `/service` に置き、カードから
`/service#<id>` へ飛ばす。姿勢・対応範囲・体制で内容が重ならない3つを選んでいる。

写真が調達できていないため、カードは **写真枠を持たない**。番号は共通モチーフの形をしたバッジ（`.badge-no`）に入れ、
その下に見出し・原稿からの抜粋・「詳しく見る」を並べる。カードの後ろには8pxずらしたベタ面（`.offset-card`）を敷く。
写真が入るときはバッジの上に写真を足す。

左カラムの `position:sticky` とカードの `translateX(-38px)` のずらしは廃止した。動きは `.reveal` だけ。

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
