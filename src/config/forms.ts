/**
 * サイト内のフォームの定義。お問い合わせ（/contact）と採用エントリー（/recruit/entry）。
 *
 * 送信はブラウザからではなくサーバ（Server Action / src/components/sendForm.ts）から
 * Googleフォームの formResponse へ流す。回答はこれまでどおりGoogleフォーム
 * （とその通知メール・スプレッドシート）に溜まる。CSP は form-action 'self' のままでよい。
 *
 * 設問の文言・選択肢・順番はGoogleフォームと同じにしてある。
 * entry の番号はGoogleフォームの設問ごとの ID。**Googleフォーム側で設問を作り直すと番号が変わり、
 * 送信が400で落ちる。**設問を触ったら viewform のHTMLの FB_PUBLIC_LOAD_DATA_ から取り直すこと。
 * 選択肢の文字列もGoogleフォームと一字一句同じでないと弾かれる。
 */

type Base = {
  /** フォームの name。エラーと入力の復元もこの名前で持つ */
  name: string;
  /** Googleフォームの entry.xxxx */
  entry: string;
  label: string;
  note?: string;
  required?: boolean;
};

export type FormField =
  | (Base & {
      kind: "text" | "tel" | "email" | "textarea";
      max: number;
      autoComplete?: string;
    })
  | (Base & {
      kind: "radio";
      options: readonly string[];
      /** Googleフォームの「その他」。選ぶと記入欄が出る */
      other?: string;
    });

export type FormDef = {
  /** formResponse の URL */
  action: string;
  /** 送信に失敗したときの逃げ道として案内する、Googleフォームそのもの */
  fallback: string;
  fields: readonly FormField[];
  agree: { entry: string; value: string; note: string };
  /** 送ったあとに出す文。このあとに「お急ぎの場合はお電話ください」が続く */
  sent: string;
};

/** Googleフォームの同意欄の説明文。2本とも同じ文 */
const agreeNote =
  "ご入力いただいた内容は、ご相談への対応および訪問看護サービスのご提供のためにのみ利用します。ご相談の内容には健康状態や病歴が含まれる場合があります。";

export const forms = {
  /*
   * 元の短縮URL：https://forms.gle/9eARLVQCTV1cjM996
   */
  contact: {
    action:
      "https://docs.google.com/forms/d/e/1FAIpQLScvgYQzkPkK7kxIjYrP--mw74JRezLZDZ-9ntYvADftokf0Cg/formResponse",
    fallback:
      "https://docs.google.com/forms/d/e/1FAIpQLScvgYQzkPkK7kxIjYrP--mw74JRezLZDZ-9ntYvADftokf0Cg/viewform",
    fields: [
      {
        kind: "radio",
        name: "role",
        entry: "entry.1182822044",
        label: "ご連絡いただく方",
        required: true,
        options: ["ケアマネジャー・医療機関の方", "ご本人・ご家族"],
        other: "その他",
      },
      {
        kind: "text",
        name: "name",
        entry: "entry.1521829712",
        label: "お名前",
        note: "事業所の方は事業所名もあわせてご記入ください",
        required: true,
        max: 100,
        autoComplete: "name",
      },
      { kind: "tel", name: "tel", entry: "entry.1057396960", label: "お電話番号", required: true, max: 30, autoComplete: "tel" },
      { kind: "email", name: "email", entry: "entry.798218222", label: "メールアドレス", max: 254, autoComplete: "email" },
      { kind: "textarea", name: "message", entry: "entry.1131049996", label: "ご相談・お問い合わせ内容", max: 4000 },
    ],
    agree: { entry: "entry.1044367186", value: "同意", note: agreeNote },
    sent: "お問い合わせありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。",
  },

  /*
   * 元の短縮URL：https://forms.gle/Xts1AqC3wNcjZbWDA
   * 必須はお名前とお電話番号だけ（Googleフォームの説明文にもそう書いてある）
   */
  recruit: {
    action:
      "https://docs.google.com/forms/d/e/1FAIpQLSfOqJ6n4ZiwaQvJnSvGOaf46YbY5-ZD2mdge8Gr7XnHFxIN8Q/formResponse",
    fallback:
      "https://docs.google.com/forms/d/e/1FAIpQLSfOqJ6n4ZiwaQvJnSvGOaf46YbY5-ZD2mdge8Gr7XnHFxIN8Q/viewform",
    fields: [
      { kind: "text", name: "name", entry: "entry.1859380156", label: "お名前", required: true, max: 100, autoComplete: "name" },
      { kind: "tel", name: "tel", entry: "entry.1775437176", label: "お電話番号", required: true, max: 30, autoComplete: "tel" },
      {
        kind: "email",
        name: "email",
        entry: "entry.921629513",
        label: "メールアドレス",
        note: "電話よりメールでのやり取りをご希望の方はご記入ください",
        max: 254,
        autoComplete: "email",
      },
      {
        kind: "radio",
        name: "purpose",
        entry: "entry.1789004371",
        label: "今回のご連絡について",
        options: ["まずは話を聞いてみたい", "事業所や訪問の見学をしてみたい", "応募したい", "条件について質問したい"],
        other: "その他",
      },
      {
        kind: "radio",
        name: "workstyle",
        entry: "entry.561695602",
        label: "ご希望の働き方",
        options: ["常勤（正社員）", "週4日の常勤（正社員）", "パート", "まだ決めていない・相談したい"],
      },
      { kind: "textarea", name: "message", entry: "entry.1135890770", label: "ご質問・伝えておきたいこと", max: 4000 },
    ],
    agree: { entry: "entry.3632433", value: "同意", note: agreeNote },
    sent: "ご連絡ありがとうございます。原則として当日中（営業時間外の場合は翌営業日の午前中）にご返信します。",
  },
} as const satisfies Record<string, FormDef>;

export type FormId = keyof typeof forms;
