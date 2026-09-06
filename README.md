# アプロ訪問看護ステーション コーポレートサイト

制作：株式会社X-EDGE / BIZT

## ドキュメント

| ファイル | 内容 |
|---|---|
| `CLAUDE.md` | Claude Codeへの指示書。作業前に読む |
| `docs/spec.md` | 制作仕様書。デザイン・ページ構成・公開前チェックリスト |
| `docs/アプロ訪問看護_HP原稿.xlsx` | 確定原稿。文言はこれが正 |
| `docs/代表挨拶原稿.md` | 代表挨拶の第1稿（クライアント確認待ち） |
| `docs/reference/top-mockup-v3.html` | TOPのデザインモック。ブラウザで開いて確認する |

## 開発

```bash
npm install
npm run dev
```

## 公開時の手順

1. `src/config/site.ts` の `【調整中】` をすべて確定値に差し替える
2. 同ファイルの `published` を `true` にする（`noindex` と robots.txt の Disallow が外れる）
3. `CHECK_TBD_STRICT=1 npm run build` が通ることを確認する
4. Search Console に `/sitemap.xml` を送信する

残りの項目は `docs/spec.md` の公開前チェックリストを参照。

## 未確定項目

`src/config/site.ts` に集約している。`【調整中】` が残った状態で本番公開しないこと。
確認待ちの一覧は `docs/spec.md` の「クライアント確認待ちの項目」を参照。
