/**
 * サイト全体で使う定数。
 * 未確定の値はすべてここに集約する。コンポーネントに直書きしないこと。
 * 【調整中】が残った状態で本番公開しない（scripts/check-tbd.ts で検出する）。
 */

export const TBD = "【調整中】" as const;

export const site = {
  name: "アプロ訪問看護ステーション",
  url: "https://apro-nsst.jp",
  nameEn: "APRO NSST",
  company: "株式会社AD3K",
  representative: "見須 清史",

  address: "〒185-0011 東京都国分寺市本多5丁目13-14",
  access: "国分寺駅 徒歩10分",

  // --- 未確定 ---

  tel: "042-312-2992",
  telHref: "tel:0423122992",
  fax: "042-312-2993",
  hours: "9:00〜18:00（月〜金）",
  holiday: "土・日・年末年始",
  oncall: "24時間オンコール対応",

  // 国立市を含めるか未確定
  /** 変えたら /service の地図も作り直すこと（`scripts/make-tokyo-map.py`） */
  areas: ["国分寺市", "小金井市", "小平市"],
  areaNote: "上記以外の地域も、まずはご相談ください。",


  established: "2023年11月",
  capital: "3,000,000円",
  staff: "5名（常勤2名・非常勤3名）",

  // 掲載可否が未確定
  licenseNumber: "1363190172",
  showLicenseNumber: false,

  // 取得加算。指定申請の控えで確認待ちのため、確定した2件のみ掲載する
  addons: ["24時間対応体制加算", "特別管理加算"],
  showAddons: false,

  // 掲載可否がクライアント判断待ち（08シート）。同意と匿名性の確認が取れるまで false
  disclosures: {
    // 30年間ご自宅から出られなかった方の就労支援（/service 特徴02）
    thirtyYearCase: false,
    // お弁当のエピソード
    bentoEpisode: false,
  },

  forms: {
    contact: `${TBD}利用相談フォームURL`,
    recruit: `${TBD}採用応募フォームURL`,
  },

  // アクセスマップ。住所のクエリで地図を出す。APIキーは要らない。
  // Google 側で /maps/embed?pb=... の正式な埋め込みURLへ転送される。
  // ピンの位置を細かく決めたいときは、Googleマップの「共有 → 地図を埋め込む」で出る
  // iframe の src をそのまま mapEmbedSrc に貼り替える。
  // 丁目のない 5-13-14 の表記で引いている。5丁目13-14 だと番地まで寄らないことがあるため
  mapEmbedSrc:
    "https://maps.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%9B%BD%E5%88%86%E5%AF%BA%E5%B8%82%E6%9C%AC%E5%A4%9A5-13-14&z=17&hl=ja&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%9B%BD%E5%88%86%E5%AF%BA%E5%B8%82%E6%9C%AC%E5%A4%9A5-13-14",

  // 募集要項。確定するまで /recruit の該当セクションは公開しない。
  // 数字は06シートが正。求人3媒体と一致させること。
  recruit: {
    // 給与レンジ①②のどちらで出すか判断待ち（08シート）
    salaryDisplay: {
      fulltime: `${TBD}給与レンジ（常勤）`,
      fourDay: `${TBD}給与レンジ（週4日・常勤）`,
      parttime: "時給 1,800円",
    },
    baseSalary: {
      fulltime: `${TBD}基本給（常勤）`,
      fourDay: `${TBD}基本給（週4日・常勤）`,
      parttime: "時給 1,800円",
    },
    modelIncome: {
      fulltime: `${TBD}モデル年収（常勤）`,
      fourDay: `${TBD}モデル年収（週4日・常勤）`,
      parttime: "―",
    },
    // 祝日を勤務日とするかで日数が変わる（08シート）
    annualHolidays: {
      fulltime: `${TBD}年間休日（常勤）`,
      fourDay: `${TBD}年間休日（週4日・常勤）`,
      parttime: "―",
    },
    holidays: {
      fulltime: `${TBD}休日・休暇（祝日の扱い）`,
      fourDay: `${TBD}休日・休暇（祝日の扱い）`,
      parttime: "シフトによる",
    },
    // 職業安定法（2024年4月施行規則改正）で明示が必要
    workLocationScope: `${TBD}就業場所の変更の範囲`,
    jobScope: `${TBD}業務内容の変更の範囲`,
  },
} as const;

/**
 * キャッチコピー。01シートの候補から現在採用している案。
 * クライアントの最終選択待ち（08シート「キャッチコピーの選択」）。
 * 差し替えはこの値だけを書き換えれば済むようにしてある。
 */
export const copy = {
  confirmed: false,
  heroEn: "Watch over the life",
  // メインキャッチ A案
  heroHeadline: ["病気ではなく、", "その人の暮らしを看る。"],
  // サブキャッチ 1。クライアント判断でヒーローには出していない。
  // 差し替え候補として残す。表示するのは meta description のみ
  heroSub: "介護も、精神も、医療も、看取りも。国分寺の訪問看護ステーションです。",
  // 採用キャッチ 1
  recruitHeadline: [
    "1日8件、行こうと思えば行けます。",
    "それでも4件にしているのは、",
    "理由があります。",
  ],
  recruitSub: "件数ではなく、その人を見る訪問看護。国分寺・小金井・小平で、一緒に働く看護師を探しています。",
  // 代表挨拶の見出し。docs/代表挨拶原稿.md のB案（クライアント選択）
  greetingHeadline: "病院から溢れてしまう人が、確かにいます。",
} as const;

export const nav = [
  { href: "/about", label: "アプロについて" },
  { href: "/service", label: "事業紹介" },
  { href: "/recruit", label: "採用情報" },
] as const;

export const footerNav = [
  {
    head: "アプロについて",
    href: "/about",
    links: [
      { href: "/about#philosophy", label: "企業理念" },
      { href: "/about#greeting", label: "代表挨拶" },
      { href: "/about#company", label: "会社概要" },
    ],
  },
  {
    head: "事業紹介",
    href: "/service",
    links: [
      { href: "/service#overview", label: "サービス内容" },
      { href: "/service#treatment", label: "対応できる医療処置" },
      { href: "/service#flow", label: "ご利用までの流れ" },
    ],
  },
  {
    head: "採用情報",
    href: "/recruit",
    links: [
      { href: "/recruit#work", label: "働き方" },
      { href: "/recruit#requirements", label: "募集要項" },
      { href: "/privacy", label: "プライバシーポリシー" },
    ],
  },
] as const;

/**
 * 公開スイッチ。false の間は noindex と robots.txt の全面 Disallow を出す。
 * 公開時にここだけ true にする（docs/spec.md 公開前チェックリスト）。
 */
export const published = false;

/** 値が未確定かどうか */
export const isTbd = (v: string) => v.includes(TBD);

const hasTbd = (value: unknown): boolean => {
  if (typeof value === "string") return isTbd(value);
  if (Array.isArray(value)) return value.some(hasTbd);
  if (value && typeof value === "object") return Object.values(value).some(hasTbd);
  return false;
};

/** 募集要項を公開してよいか。職業安定法の明示事項が揃うまで false */
export const recruitRequirementsReady = !hasTbd(site.recruit) && !isTbd(site.address);

/** 住所が確定するまで構造化データの postalAddress を出さない */
export const addressReady = !isTbd(site.address);

export const areaText = site.areas.join("／");
