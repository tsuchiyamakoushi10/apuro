"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { forms, type FormField, type FormId } from "@/config/forms";
import { site } from "@/config/site";
import { sendForm, type FormState } from "./sendForm";

const initialState: FormState = { status: "idle" };

/*
 * 入力欄の文字は 1rem。目盛りの 15px（0.9375rem）だと、iOS の Safari が
 * 16px 未満の入力欄にフォーカスしたときに画面を拡大してしまうため、ここだけ一段上げている
 */
const fieldClass =
  "mt-3 block w-full rounded-card border border-blue-soft bg-paper px-5 py-3.5 text-[1rem] leading-[1.7] transition-colors duration-200 hover:border-blue aria-[invalid=true]:border-alert";

const linkClass = "link-hover border-b border-blue-soft";

/**
 * サイト内のフォーム。設問は src/config/forms.ts、送信は Server Action（./sendForm.ts）からGoogleフォームへ。
 * JavaScript が動かなくても送れる（React の form action はそのまま POST になる）。
 */
export function SiteForm({ id }: { id: FormId }) {
  const def = forms[id];
  const action = useMemo(() => sendForm.bind(null, id), [id]);
  const [state, formAction, pending] = useActionState(action, initialState);
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const resultRef = useRef<HTMLDivElement>(null);

  // 送信後は結果の文にフォーカスを移す。画面の上のほうにあるので、移さないと気づかない
  useEffect(() => {
    if (state.status !== "idle") resultRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-card bg-mist px-10 py-12 max-[960px]:px-7 max-[960px]:py-9"
      >
        <p className="font-heading text-[1.1875rem] text-blue-ink">送信しました。</p>
        <p className="mt-4">
          {def.sent}お急ぎの場合はお電話ください（
          <a href={site.telHref} className={linkClass}>
            {site.tel}
          </a>
          ／{site.hours}）。
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-9">
      {state.status === "error" ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="rounded-card border border-alert px-7 py-5 text-[0.9375rem] text-alert"
        >
          {state.message ?? `入力内容をご確認ください（${Object.keys(errors).length}件）。`}
          {state.message ? (
            <span className="mt-2 block text-ink">
              <a href={site.telHref} className={linkClass}>
                {site.tel}
              </a>
              ／
              <a href={def.fallback} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Googleフォームから送る
                <span className="sr-only">（別タブで開きます）</span>
              </a>
            </span>
          ) : null}
        </div>
      ) : null}

      {def.fields.map((field) =>
        field.kind === "radio" ? (
          <RadioField key={field.name} field={field} values={values} errors={errors} />
        ) : (
          <TextField key={field.name} field={field} value={values[field.name]} error={errors[field.name]} />
        ),
      )}

      {/* ボット除け。人には見えず、読み上げとタブ送りからも外す */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="border-t border-blue-soft pt-8">
        <p className="font-heading text-[0.9375rem] text-blue-ink">
          個人情報の取扱いについて
          <Required />
        </p>
        <p id="agree-note" className="mt-3 text-[0.875rem] text-ink-muted">
          {def.agree.note}詳しくは
          <Link href="/privacy" className={linkClass}>
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>
        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="agree"
            value="1"
            required
            defaultChecked={values.agree === "1"}
            aria-invalid={errors.agree ? true : undefined}
            aria-describedby={`agree-note${errors.agree ? " agree-error" : ""}`}
            className="h-[18px] w-[18px] accent-blue"
          />
          {def.agree.value}
        </label>
        <FieldError id="agree-error" message={errors.agree} />
      </div>

      <div>
        <button type="submit" disabled={pending} className="pill cursor-pointer disabled:cursor-wait disabled:opacity-60">
          {pending ? "送信しています" : "送信する"}
        </button>
      </div>
    </form>
  );
}

function TextField({
  field,
  value,
  error,
}: {
  field: Extract<FormField, { kind: "text" | "tel" | "email" | "textarea" }>;
  value?: string;
  error?: string;
}) {
  const props = {
    id: field.name,
    name: field.name,
    required: field.required,
    maxLength: field.max,
    autoComplete: field.autoComplete,
    defaultValue: value,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(field.name, field.note, error) || undefined,
  };

  return (
    <Labeled htmlFor={field.name} label={field.label} required={field.required} note={field.note} noteId={`${field.name}-note`}>
      {field.kind === "textarea" ? (
        <textarea {...props} rows={8} className={`${fieldClass} resize-y`} />
      ) : (
        <input
          {...props}
          type={field.kind}
          inputMode={field.kind === "tel" ? "tel" : undefined}
          className={fieldClass}
        />
      )}
      <FieldError id={`${field.name}-error`} message={error} />
    </Labeled>
  );
}

function RadioField({
  field,
  values,
  errors,
}: {
  field: Extract<FormField, { kind: "radio" }>;
  values: Record<string, string>;
  errors: Record<string, string>;
}) {
  const [selected, setSelected] = useState(values[field.name] ?? "");
  const otherName = `${field.name}Other`;
  const options = field.other ? [...field.options, field.other] : field.options;

  return (
    <fieldset aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}>
      <legend className="font-heading text-[0.9375rem] text-blue-ink">
        {field.label}
        {field.required ? <Required /> : null}
      </legend>
      <div className="mt-3 grid gap-3">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name={field.name}
              value={option}
              required={field.required}
              defaultChecked={values[field.name] === option}
              onChange={() => setSelected(option)}
              className="h-[18px] w-[18px] shrink-0 accent-blue"
            />
            {option}
          </label>
        ))}
      </div>
      <FieldError id={`${field.name}-error`} message={errors[field.name]} />

      {field.other && selected === field.other ? (
        <div className="mt-5">
          <Labeled htmlFor={otherName} label={`「${field.other}」の内容`} required>
            <input
              id={otherName}
              name={otherName}
              type="text"
              required
              maxLength={100}
              defaultValue={values[otherName]}
              aria-invalid={errors[otherName] ? true : undefined}
              aria-describedby={errors[otherName] ? `${otherName}-error` : undefined}
              className={fieldClass}
            />
            <FieldError id={`${otherName}-error`} message={errors[otherName]} />
          </Labeled>
        </div>
      ) : null}
    </fieldset>
  );
}

function describedBy(name: string, note?: string, error?: string) {
  return [note ? `${name}-note` : "", error ? `${name}-error` : ""].filter(Boolean).join(" ");
}

function Labeled({
  htmlFor,
  label,
  required = false,
  note,
  noteId,
  children,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  note?: string;
  noteId?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="font-heading text-[0.9375rem] text-blue-ink">
        {label}
        {required ? <Required /> : null}
      </label>
      {note ? (
        <p id={noteId} className="mt-1 text-[0.8125rem] text-ink-muted">
          {note}
        </p>
      ) : null}
      {children}
    </div>
  );
}

function Required() {
  return <span className="ml-2 font-body text-[0.8125rem] text-blue">必須</span>;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.84375rem] text-alert">
      {message}
    </p>
  );
}
