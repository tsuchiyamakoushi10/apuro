"use server";

import { forms, type FormDef, type FormId } from "@/config/forms";

export type FormState = {
  status: "idle" | "error" | "sent";
  /** 送信そのものに失敗したとき（Googleフォームが受け付けなかったとき）の文 */
  message?: string;
  /** 欄の name → エラー文。「その他」の記入欄は `<name>Other`、同意は `agree` */
  errors?: Record<string, string>;
  /** エラーで戻したときに入力を復元する。React 19 はアクションのあとフォームを初期値に戻すため */
  values?: Record<string, string>;
};

const text = (formData: FormData, key: string) => {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
};

const OTHER_MAX = 100;

/**
 * フォームの送信。サーバからGoogleフォームの formResponse へそのまま送る。
 * ブラウザの検証（required など）は飛ばせるので、ここでも同じことを確かめる。
 * どのフォームかは呼ぶ側で bind して渡す（SiteForm）。
 */
export async function sendForm(id: FormId, _prev: FormState, formData: FormData): Promise<FormState> {
  const def: FormDef | undefined = forms[id];
  if (!def) return { status: "error", message: "送信できませんでした。" };

  // ボット除け。人には見えない欄なので、入っていたら送ったことにして捨てる
  if (text(formData, "website")) return { status: "sent" };

  const values: Record<string, string> = {};
  const errors: Record<string, string> = {};
  const body = new URLSearchParams();

  for (const field of def.fields) {
    const value = text(formData, field.name);
    values[field.name] = value;

    if (field.kind === "radio") {
      const otherName = `${field.name}Other`;
      const otherValue = text(formData, otherName);
      values[otherName] = otherValue;

      if (!value) {
        if (field.required) errors[field.name] = `${field.label}を選んでください。`;
      } else if (field.other && value === field.other) {
        if (!otherValue) errors[otherName] = `「${field.other}」の内容をご記入ください。`;
        else if (otherValue.length > OTHER_MAX) errors[otherName] = `${OTHER_MAX}文字以内でご記入ください。`;
        body.set(field.entry, "__other_option__");
        body.set(`${field.entry}.other_option_response`, otherValue);
      } else if (!(field.options as readonly string[]).includes(value)) {
        errors[field.name] = `${field.label}を選んでください。`;
      } else {
        body.set(field.entry, value);
      }
      continue;
    }

    if (!value) {
      if (field.required) errors[field.name] = `${field.label}をご記入ください。`;
    } else if (value.length > field.max) {
      errors[field.name] = `${field.max}文字以内でご記入ください。`;
    } else if (field.kind === "tel" && !/^[0-9０-９+＋()（）\-－ー‐ ]+$/.test(value)) {
      errors[field.name] = `${field.label}は数字とハイフンでご記入ください。`;
    } else if (field.kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = `${field.label}の形式をご確認ください。`;
    }
    body.set(field.entry, value);
  }

  values.agree = formData.get("agree") ? "1" : "";
  if (!values.agree) errors.agree = "個人情報の取扱いへの同意が必要です。";
  body.set(def.agree.entry, def.agree.value);

  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  try {
    // 受け付けると200、設問の ID や選択肢が合わないと400が返る
    const res = await fetch(def.action, {
      method: "POST",
      body,
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Google Forms responded ${res.status}`);
  } catch (e) {
    console.error(`[form:${id}] 送信に失敗しました`, e);
    return {
      status: "error",
      message: "送信できませんでした。時間をおいてもう一度お試しいただくか、お電話でご連絡ください。",
      values,
    };
  }

  return { status: "sent" };
}
