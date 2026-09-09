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

  // 3市で確定（国立市は含めない・クライアント判断）。
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
    // 06シートの数字（08シートの給与レンジ①）。②で出す場合は
    // 月給 300,000〜350,000円／基本給 220,000〜270,000円に差し替える
    salaryDisplay: {
      fulltime: "月給 300,000円〜330,000円",
      fourDay: "月給 256,000円〜280,000円",
      parttime: "時給 1,800円",
    },
    baseSalary: {
      fulltime: "220,000円〜250,000円",
      fourDay: "176,000円〜200,000円（常勤の80%）",
      parttime: "時給 1,800円",
    },
    modelIncome: {
      fulltime: "4,200,000円〜4,800,000円",
      fourDay: "3,360,000円〜3,840,000円",
      parttime: "―",
    },
    /*
     * 祝日は勤務日（クライアント確定）。
     * 常勤は 土日104日＋年末年始4日＝108日 なので、110日にするために特別休暇2日を足している。
     * **特別休暇2日は実際に付与すること。**求人票の日数と実態がずれると問題になる。
     * 週4日常勤は 週3日休み×52＝156日＋年末年始4日＝160日で、足す必要はない
     */
    annualHolidays: {
      fulltime: "110日",
      fourDay: "160日",
      parttime: "―",
    },
    holidays: {
      fulltime: "完全週休二日制（土・日）\n年末年始（12/31〜1/3）\n特別休暇2日\n有給休暇\n※祝日は勤務日です",
      fourDay: "土・日＋平日1日\n年末年始（12/31〜1/3）\n有給休暇\n※祝日は勤務日です",
      parttime: "シフトによる",
    },
    /*
     * 職業安定法（2024年4月施行規則改正）で明示が必要。
     * 雇入れ直後だけでなく「将来の変更の範囲」まで書くことになっている。
     * 事業所が1つで訪問看護以外の職種もないため、どちらも変更なし（クライアント確定）。
     * **書いた範囲は約束になる。**配置転換や事業所を増やす予定ができたら書き直すこと
     */
    workLocationScope: "変更なし（事業所および訪問先）",
    jobScope: "変更なし（訪問看護業務）",
  },
} as const;

/**
 * キャッチコピー。01シートの候補から現在採用している案。
 * クライアントの最終選択待ち（08シート「キャッチコピーの選択」）。
 * 差し替えはこの値だけを書き換えれば済むようにしてある。
 */
export const copy = {
  // メインキャッチA案・サブキャッチ1案・採用キャッチ1案で確定（01シート／クライアント選択）
  confirmed: true,
  heroEn: "Watch over the life",
  // メインキャッチ A案
  heroHeadline: ["病気ではなく、", "その人の暮らしを看る。"],
  // サブキャッチ 1（クライアント選択）。ヒーローには出さず、meta description だけに使う
  heroSub: "介護も、精神も、医療も、看取りも。国分寺の訪問看護ステーションです。",
  /*
   * 採用キャッチ 1（01シート）。3行あって見出しには長すぎるため、
   * 見出しにはサブキャッチのほうを使っている（クライアント判断）。
   * 中身は採用ページの導入リードの1〜3文目と重なるので、外しても伝わることは減らない。
   * 原稿なので消さずに置いてある
   */
  recruitCatch: ["1日8件、行こうと思えば行けます。", "それでも4件にしているのは、", "理由があります。"],
  // 採用キャッチ 1 のサブキャッチ。これを見出しに使う
  recruitHeadline: ["件数ではなく、", "その人を見る訪問看護。"],
  recruitSub: "国分寺・小金井・小平で、一緒に働く看護師を探しています。",
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
