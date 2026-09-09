"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/config/site";

/**
 * 1300px 未満のナビゲーション。1行に収まらないので畳んでいる（電話番号もこの中）。
 *
 * 開くと写真の上に薄い白の面と文字が重なって出る。面は下に押し広げず、
 * ヘッダーの下にかぶせる。閉じているあいだは `invisible` でタブ送りからも外す。
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
    <div className="relative hidden border-t border-blue-soft max-[1300px]:block">
      {/* 面の外を押しても閉じる。キーボードは Esc とMENUで閉じられるので読み上げからは外す。
          ヘッダーが backdrop-filter を持っていて fixed の基準がヘッダーになるため、
          absolute で MENU の下から画面の高さぶん敷く（メニューの面はこれより後ろに置いて上に出す） */}
      {open ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-full h-screen"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {/* MENUと▼はひとまとまりで右端に置く。両端に振ると別のものに見えて、開閉のしるしだと分からなくなる */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="wrap relative flex w-full cursor-pointer items-center justify-end gap-2.5 py-3.5 font-en text-[0.84375rem] tracking-[0.16em] text-blue"
      >
        MENU
        <span
          aria-hidden="true"
          className={`h-[7px] w-[7px] border-r-[1.5px] border-t-[1.5px] border-blue transition-transform duration-300 ${
            open ? "rotate-[315deg]" : "rotate-135"
          }`}
        />
      </button>

      {/* 白の濃さは、ぼかしが効かない場合でも文字が読める値にしてある。
          ヘッダーが backdrop-filter を持つため、入れ子のぼかしは効かないことがある */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full border-b border-blue-soft bg-[rgba(255,255,255,0.88)] backdrop-blur-[10px] transition-[opacity,translate,visibility] duration-300 ease-out ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="メインナビゲーション（モバイル）" className="wrap py-4">
          <ul className="marker-list text-[0.9375rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.telHref} className="block py-2" onClick={() => setOpen(false)}>
                お電話でのご相談 {site.tel}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
