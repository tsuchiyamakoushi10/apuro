"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isTbd, nav, site } from "@/config/site";

/** 受話器。メニューの電話番号の頭に置く */
function PhoneGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.2 3.8h3.2l1.6 4-2 1.2a11 11 0 0 0 5 5l1.2-2 4 1.6v3.2a1.6 1.6 0 0 1-1.6 1.6A13.6 13.6 0 0 1 4.6 5.4a1.6 1.6 0 0 1 1.6-1.6Z" />
    </svg>
  );
}

/** フォームの窓口。URLが未確定のうちはリンクにしない（Contact の FormCard と同じ扱い） */
function FormPill({ href, label }: { href: string; label: string }) {
  const ready = !isTbd(href);
  /* 文字は 19px。15px だと面の高さに対して小さく、ボタンだけ太って見える */
  const className =
    "block rounded-full bg-paper px-6 py-4 text-center font-heading text-[1.1875rem] leading-[1.5] text-blue";

  if (!ready) {
    return (
      <span className={className}>
        {label}
        <span className="tbd-light mt-1 block text-[0.8125rem]">{href}</span>
      </span>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {label}
      <span className="sr-only">（別タブで開きます）</span>
    </a>
  );
}

/**
 * 1380px 未満のナビゲーション。1行に収まらないので畳んでいる。
 *
 * 開くと、ヘッダーの下が淡い青で埋まり、大きな文字のリンクと、
 * 電話番号・フォームの窓口をまとめた青い面が出る。下のコンテンツは押し広げない。
 * 閉じているあいだは `invisible` でタブ送りからも外す。
 *
 * 以前は `<details>` でJavaScriptなしに開閉していたが、
 * 遷移してもメニューが開いたままになるためクライアント側の状態に変えた。
 * 動きは opacity と translate だけ。`prefers-reduced-motion: reduce` のときは
 * globals.css がすべての transition を止めるので、ここでは何もしない。
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* 遷移したら閉じる。同じページのリンクはパスが変わらないので onClick 側でも閉じる */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="relative hidden border-t border-blue-soft max-[1380px]:block">
      {/* 面の下も同じ色で埋めて、画面いっぱいに見せる。押すと閉じる。
          ヘッダーが backdrop-filter を持っていて fixed の基準がヘッダーになるため、
          absolute で MENU の下から画面の高さぶん敷く */}
      {open ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-full h-screen bg-blue-soft"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {/* MENUと印はひとまとまりで右端に置く。開いているあいだは×にする */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="wrap relative flex w-full cursor-pointer items-center justify-end gap-2.5 py-3.5 font-en text-[0.84375rem] tracking-[0.16em] text-blue"
      >
        MENU
        {open ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 14 14"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
          >
            <path d="M2 2 12 12M12 2 2 12" />
          </svg>
        ) : (
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] rotate-135 border-r-[1.5px] border-t-[1.5px] border-blue"
          />
        )}
      </button>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full bg-blue-soft transition-[opacity,translate,visibility] duration-300 ease-out ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="wrap py-9">
          <nav aria-label="メインナビゲーション（モバイル）">
            <ul className="list-none">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 font-heading text-[1.4375rem] font-medium text-blue-ink"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ご相談の窓口。電話とフォームをひとまとめにして面で囲う */}
          <div className="on-color mt-8 rounded-card bg-blue px-6 py-7">
            <a
              href={site.telHref}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-3 text-paper"
            >
              <PhoneGlyph />
              <span className="font-en text-[1.4375rem] leading-none tracking-[0.02em]">
                {site.tel}
              </span>
            </a>
            <p className="mt-2 text-center text-[0.8125rem] text-[rgba(255,255,255,0.8)]">
              {site.hours}
            </p>
            <div className="mt-5 grid gap-3">
              <FormPill href={site.forms.contact} label="お問い合わせ" />
              <FormPill href={site.forms.recruit} label="採用エントリー" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
