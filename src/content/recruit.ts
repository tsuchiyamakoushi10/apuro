import { site } from "@/config/site";

/**
 * 05シート（採用情報）／06シート（募集要項）。
 * 文言と改行位置は原稿が正。求人3媒体と同じ数字を使う。
 */

export const lead = `訪問看護は、件数を増やそうと思えばいくらでも増やせる仕事です。
1日8件回れば、売上は倍近くになります。

でも私たちは、1日4件を基準にしています。
会社の利益のためにスタッフを働かせすぎることは、しないと決めているからです。

必要な看護を、必要なだけ届ける。
そのために働き方のほうを設計しています。`;

export const philosophy = `私たちが探しているのは、利用者様を差別しない人です。

訪問看護の現場には、きれいに整ったお宅ばかりではありません。
物が片付いていないお宅も、動物がたくさんいるお宅もあります。
そうした場所にも、当たり前のように入っていける人。
難しいと思っても、前向きに取り組んでくれる人。
そういう方と一緒に働きたいと思っています。

看護の技術は、あとから身につきます。
実際に、訪問看護が未経験の方も受け入れています。
大切なのは、その人に向き合おうとする姿勢のほうです。`;

/**
 * 代表挨拶の採用ページ用（短縮版）。docs/代表挨拶原稿.md
 * ページ構成をまとめた際に採用ページからは外した（代表挨拶は /about にある）。
 * 原稿なので消さずに置いてある
 */
export const greetingShort = `私が探しているのは、疾患で利用者さんを見ない方です。診断名の向こう側にいるその人に、まっすぐ関心を向けられる方。そして、看護の仕事そのものが好きな方。

技術はあとから身につきます。入職後は同行訪問や事務所での作業を一緒にやりながら、順番に覚えていただきます。訪問看護が初めてでも問題ありません。

件数を増やすことは求めません。自分のペースで、長く続けてもらえる働き方を用意しています。`;

export const persona = [
  {
    title: "こんな方と働きたい",
    items: [
      "元気で明るい方",
      "利用者様を差別しない、分け隔てなく関われる方",
      "難しいと思っても、前向きに取り組んでくださる方",
    ],
  },
  {
    title: "向いていないかもしれない方",
    items: ["人と話すことが苦手な方（雑談も含めて、会話の多い仕事です）", "礼儀を大切にできない方"],
  },
];

export const workStyle = [
  {
    title: "1日4件が基準",
    body: `1日の訪問件数は平均4件、多いときで6件です。
移動は電動自転車または原付。国分寺市を中心に、
小金井市・小平市を回ります。車の運転免許は必要ありません。

1日の流れは、出勤 → 訪問 → 記録 → 退勤。
残業はありません。`,
  },
  {
    title: "頑張った分は還元します",
    body: `月71件目からは、1件につき3,000円をお支払いしています。
ただし「増やせ」と言うことはありません。
自分のペースで働ける方を優先します。`,
  },
  {
    title: "オンコールは電話当番から",
    body: `オンコールは電話当番制で、手当は1日2,000円です。
常勤で週2回、週4日勤務の方で週1回程度です。
訪問が必要と判断した場合は、まず代表にご相談ください。
出動した場合は1件につき6,000円をお支払いします。
※パートの方はオンコールなしです。`,
  },
  {
    title: "記録はスマホ・タブレットで",
    body: `スマートフォンとタブレットを貸与しています。
毎月の報告書作成にはAIを導入し、事務作業の負担を減らしています。`,
  },
  {
    title: "パートは直行直帰ができます",
    body: `パートの方は直行直帰が可能です。勤務時間もご相談ください。
※常勤の方は人員基準の関係で直行直帰はできません。`,
  },
];

export const education = [
  {
    title: "同行訪問を2週間、みっちり",
    body: `訪問看護が初めての方には、2週間かけて同行訪問を行います。
1日中、先輩と一緒に回ります。

訪問看護の世界には、現地集合でいきなり一人で訪問、
という事業所も少なくありません。私たちはそうしません。`,
  },
  {
    title: "曜日ごとに引き継いでいきます",
    body: `「月曜日に伺うこの5名」というように、
曜日ごとの担当を一組ずつ覚えていただき、
覚えたところから順にお任せしていきます。
利用者様ごとの処置の内容や関わり方も、その都度お伝えします。`,
  },
  {
    title: "ペースは人それぞれ",
    body: `覚える速度は人によって違います。
2週間で足りなければ、それ以上続けます。
一人で行けるようになるまで、とことん教えます。`,
  },
  {
    title: "研修費は会社が負担",
    body: `研修にかかる費用は会社が負担します。自己負担はありません。
精神科訪問看護に必要な研修（2ヶ月間の動画受講）も対象です。`,
  },
];

/** id は区分ごとのアイコン（`BenefitIcon`）を引くための鍵。区分を足したら形も足す */
export const benefits = [
  {
    id: "allowance",
    title: "手当・制度",
    items: [
      "社会保険完備（健康保険・厚生年金・雇用保険・労災保険）",
      "資格手当（正看護師 50,000円／准看護師 30,000円）",
      "職務手当 30,000円",
      "訪問件数手当（月71件目から1件3,000円）",
      "オンコール手当（待機 1日2,000円／緊急対応 1件6,000円）",
      "通勤手当",
      "昇給あり",
      "決算賞与（年1回）",
      "慶弔休暇",
      "産休・育休制度",
      "時短勤務制度",
    ],
  },
  {
    id: "cost",
    title: "費用の負担",
    items: ["研修費 全額会社負担", "健康診断の費用を会社負担", "予防接種の費用を会社負担"],
  },
  {
    id: "lending",
    title: "貸与するもの",
    items: ["制服", "訪問備品一式", "電動自転車、原付", "スマートフォン、タブレット", "空調服"],
  },
  {
    id: "other",
    title: "その他",
    items: ["事務所でお茶を支給しています（自由に飲めます）"],
  },
];

/** --sand を使う唯一のブロック */
export const honesty = {
  intro: `入職してから「聞いていた話と違う」となるのがいちばん良くないので、
先にお伝えしておきます。`,
  items: [
    "お部屋が片付いていないお宅への訪問があります",
    "犬・猫・鳥などの動物を飼っているお宅があります",
    "こころの不調を抱えた方への訪問が多く、\n　会話や関わり方に時間がかかるケースがあります",
  ],
  outro: "こうした現場を一緒に引き受けてくださる方を探しています。",
};

export const weekFourPitch = `「週5日は難しいけれど、正社員として働きたい」
そんな方のための枠です。

給与は日数に応じた設定になりますが、待遇そのものは正社員と同じ。
有給も正社員と同じように発生します。
パートのように、会社が休みの日は収入が入らない、ということもありません。
年間休日は160日。オンコールも週1回程度です。

・子育てと両立したい
・自分の時間も大切にしたい
・無理なく、長く看護を続けたい

そんな働き方を、制度として用意しています。`;

/* ------------------------------------------------------------------ */
/* 募集要項（06シート）                                                */
/* 職業安定法の明示事項は docs/spec.md「職業安定法上の明示事項」を参照 */
/* ------------------------------------------------------------------ */


export const jobs = [
  { key: "fulltime", label: "看護師（常勤）" },
  { key: "fourDay", label: "看護師（週4日・常勤）" },
  { key: "parttime", label: "看護師（パート）" },
] as const;

export type JobKey = (typeof jobs)[number]["key"];

type Row = { label: string; values: Record<JobKey, string>; note?: string };

const same = "同左";

export const requirementGroups: { heading: string; rows: Row[] }[] = [
  {
    heading: "給与",
    rows: [
      {
        label: "雇用形態",
        values: {
          fulltime: "常勤（正社員）",
          fourDay: "常勤（正社員・週4日）",
          parttime: "非常勤（パート）",
        },
      },
      { label: "給与表示", values: site.recruit.salaryDisplay },
      { label: "基本給", values: site.recruit.baseSalary },
      {
        label: "資格手当",
        values: {
          fulltime: "正看護師 50,000円／准看護師 30,000円",
          fourDay: same,
          parttime: "なし（時給に含む）",
        },
      },
      { label: "職務手当", values: { fulltime: "30,000円", fourDay: "30,000円", parttime: "なし" } },
      {
        label: "訪問件数手当",
        values: {
          fulltime: "月71件目から 1件3,000円（1時間訪問）",
          fourDay: same,
          parttime: "なし",
        },
      },
      {
        label: "オンコール手当",
        values: {
          fulltime: "待機 1日2,000円／緊急対応 1件6,000円",
          fourDay: same,
          parttime: "なし",
        },
      },
      { label: "通勤手当", values: { fulltime: "あり", fourDay: "あり", parttime: "あり" } },
      { label: "固定残業代", values: { fulltime: "なし", fourDay: "なし", parttime: "なし" } },
      { label: "モデル年収", values: site.recruit.modelIncome },
      {
        label: "賞与",
        values: {
          fulltime: "年1回（決算賞与・業績による／前年度の支給実績なし）",
          fourDay: same,
          parttime: "なし",
        },
      },
      { label: "昇給", values: { fulltime: "あり", fourDay: "あり", parttime: "なし" } },
    ],
  },
  {
    heading: "勤務",
    rows: [
      {
        label: "勤務時間",
        values: {
          fulltime: "9:00〜18:00（休憩60分）",
          fourDay: "9:00〜18:00（休憩60分）／週4日",
          parttime: "9:00〜17:00（休憩60分）\n勤務時間・曜日は応相談",
        },
      },
      { label: "残業", values: { fulltime: "なし", fourDay: "なし", parttime: "なし" } },
      { label: "年間休日", values: site.recruit.annualHolidays },
      { label: "休日・休暇", values: site.recruit.holidays },
      {
        label: "1日の訪問件数",
        values: { fulltime: "平均4件／最大6件", fourDay: "平均4件／最大6件", parttime: "平均4件／最大6件" },
      },
      {
        label: "移動手段",
        values: {
          fulltime: "電動自転車または原付（貸与）\n車の運転免許は不要",
          fourDay: same,
          parttime: same,
        },
      },
      { label: "直行直帰", values: { fulltime: "不可", fourDay: "不可", parttime: "可" } },
      {
        label: "オンコール",
        values: { fulltime: "あり（週2回程度）", fourDay: "あり（週1回程度）", parttime: "なし" },
      },
      {
        label: "勤務地",
        values: { fulltime: site.address, fourDay: same, parttime: same },
      },
      {
        label: "就業場所の変更の範囲",
        values: { fulltime: site.recruit.workLocationScope, fourDay: same, parttime: same },
      },
      {
        label: "訪問エリア",
        values: { fulltime: site.areas.join("・"), fourDay: same, parttime: same },
      },
    ],
  },
  {
    heading: "応募・待遇",
    rows: [
      {
        label: "業務内容",
        values: {
          fulltime: "訪問看護（療養上のお世話・診療の補助）、記録・報告書の作成",
          fourDay: same,
          parttime: same,
        },
      },
      {
        label: "業務内容の変更の範囲",
        values: { fulltime: site.recruit.jobScope, fourDay: same, parttime: same },
      },
      {
        label: "応募資格",
        values: { fulltime: "正看護師・准看護師・保健師のいずれか", fourDay: same, parttime: same },
      },
      {
        label: "必要な経験",
        values: { fulltime: "不問（訪問看護未経験・ブランク可）", fourDay: same, parttime: same },
      },
      {
        label: "教育",
        values: { fulltime: "同行訪問2週間（1日中同行）", fourDay: same, parttime: same },
      },
      { label: "試用期間", values: { fulltime: "3ヶ月（同条件）", fourDay: same, parttime: same } },
      {
        label: "加入保険",
        values: {
          fulltime: "社会保険・雇用保険・健康保険・労災保険",
          fourDay: same,
          parttime: "加入条件を満たす場合",
        },
      },
      { label: "退職金", values: { fulltime: "なし", fourDay: "なし", parttime: "なし" } },
      {
        label: "その他の福利厚生",
        values: {
          fulltime:
            "研修費 全額会社負担／健康診断／予防接種／慶弔休暇／産休・育休／時短勤務／制服貸与／訪問備品一式貸与／電動自転車・原付貸与／空調服貸与／お茶支給",
          fourDay: same,
          parttime: same,
        },
      },
      { label: "受動喫煙対策", values: { fulltime: "屋内禁煙", fourDay: same, parttime: same } },
      { label: "募集者の名称", values: { fulltime: site.company, fourDay: same, parttime: same } },
    ],
  },
];
