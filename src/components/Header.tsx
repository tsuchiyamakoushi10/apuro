import Link from "next/link";
import { nav, site } from "@/config/site";
import { MobileMenu } from "./MobileMenu";
import { Pill } from "./ui";

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`block leading-none ${className}`}>
      <span className="block font-heading text-[18px] font-medium leading-[1.3] tracking-[0.09em] text-blue-ink">
        {site.name}
      </span>
      <span className="block font-en text-[9.5px] tracking-[0.3em] text-blue">{site.nameEn}</span>
    </span>
  );
}

export { Logo };

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-[rgba(255,255,255,0.94)] backdrop-blur-[6px]">
      <div className="wrap-header flex h-[84px] items-center justify-between gap-7 max-[1300px]:h-auto max-[1300px]:gap-4 max-[1300px]:py-3">
        <Link href="/" aria-label={`${site.name} トップページ`} className="min-w-0">
          <Logo className="whitespace-nowrap max-[600px]:[&>span:first-child]:text-[13.5px] max-[600px]:[&>span:first-child]:tracking-[0.04em] max-[600px]:[&>span:last-child]:text-[8.5px] max-[430px]:[&>span:first-child]:text-[11.5px] max-[430px]:[&>span:first-child]:tracking-[0] max-[430px]:[&>span:last-child]:text-[8px]" />
        </Link>

        <nav aria-label="メインナビゲーション" className="max-[1300px]:hidden">
          <ul className="flex list-none gap-[30px] whitespace-nowrap text-[1rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <a href={site.telHref} className="max-[1300px]:hidden">
            <span className="block font-en text-[1.4375rem] leading-[1.2] text-blue-ink">{site.tel}</span>
            <span className="whitespace-nowrap text-[0.8125rem] text-ink-muted">
              {site.hours}／{site.oncall}
            </span>
          </a>
          <span className="whitespace-nowrap [&>a]:px-6 [&>a]:py-3 [&>a]:text-[0.875rem] max-[600px]:[&>a]:gap-2 max-[600px]:[&>a]:px-4 max-[600px]:[&>a]:py-2.5 max-[600px]:[&>a]:text-[0.84375rem]">
            <Pill href="/#contact">ご相談はこちら</Pill>
          </span>
        </div>
      </div>

      <MobileMenu />
    </header>
  );
}
