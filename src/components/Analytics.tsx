import Script from "next/script";
import { site } from "@/config/site";

/**
 * GA4。`site.ga4Id` が空のあいだは何も出さない。
 * タグも通信も発生しないので、IDを入れるまではGoogleへの送信は起きない。
 *
 * CSPで googletagmanager（スクリプト）と google-analytics（送信先）を通す必要がある。
 * next.config.ts が `site.ga4Id` を見て自動で足すようにしてあるが、
 * **IDを入れたあとは dev サーバを再起動すること**（next.config.ts は起動時に読まれる）。
 *
 * IPの匿名化はGA4では既定の動作なので、gtag側の指定は要らない。
 * 公開前の確認用デプロイでも動く。プレビューの数字を混ぜたくない場合は
 * GA4側でホスト名による除外フィルタを作る（IDを分けるほどのものではない）
 */
export function Analytics() {
  if (!site.ga4Id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4Id}`} />
      <Script id="ga4-config">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.ga4Id}');`}
      </Script>
    </>
  );
}
