import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { addressReady, published, site } from "@/config/site";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-zen-kaku",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-jost",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}｜国分寺市の訪問看護（精神・介護・医療・看取り）`,
    template: `%s｜${site.name}`,
  },
  description:
    "アプロ訪問看護ステーションは、国分寺市を中心に、こころの不調を抱えた方への訪問看護から高齢者の在宅療養、看取りまでを担う訪問看護ステーションです。24時間オンコール対応。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
  },
  // site.ts の published を true にすると解除される。docs/spec.md 公開前チェックリスト
  robots: published ? undefined : { index: false, follow: false },
};

/** 構造化データ。住所が確定するまで postalAddress は出さない */
function medicalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    parentOrganization: { "@type": "Organization", name: site.company },
    telephone: site.tel,
    faxNumber: site.fax,
    areaServed: site.areas.map((area) => ({ "@type": "City", name: area })),
    openingHours: "Mo-Fr 09:00-18:00",
    ...(addressReady
      ? { address: { "@type": "PostalAddress", addressCountry: "JP", streetAddress: site.address } }
      : {}),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${zenKaku.variable} ${notoSansJp.variable} ${jost.variable} ${cormorant.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-blue focus:px-5 focus:py-2 focus:text-paper"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd()) }}
        />
      </body>
    </html>
  );
}
