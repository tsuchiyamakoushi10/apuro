import Link from "next/link";
import { footerNav, site } from "@/config/site";
import { Logo } from "./Header";
import { Tbd } from "./ui";

export function Footer() {
  return (
    <footer className="mx-8 rounded-t-panel bg-mist pb-11 pt-[76px] text-[0.875rem] text-ink-muted max-[960px]:mx-4">
      <div className="wrap-panel grid grid-cols-[340px_1fr] gap-[60px] max-[960px]:grid-cols-1 max-[960px]:gap-[34px] max-[960px]:px-6">
        <div>
          <Logo className="mb-5" />
          <p>
            <span className="block">
              <Tbd value={site.address} />
            </span>
            <span className="block">
              <Tbd value={site.access} />
            </span>
            <span className="block">
              TEL <a href={site.telHref}>{site.tel}</a> ／ FAX {site.fax}
            </span>
            <span className="block">運営：{site.company}</span>
            <span className="block">対応エリア：{site.areas.join("・")}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-[30px] max-[960px]:grid-cols-1 max-[960px]:gap-6">
          {footerNav.map((group) => (
            <nav key={group.head} aria-label={group.head}>
              <p className="mb-1 font-heading text-blue-ink">
                <Link href={group.href}>{group.head}</Link>
              </p>
              <ul className="list-none leading-[2.2]">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <p className="wrap-panel mx-auto mt-11 max-w-[calc(var(--container-wrap)-64px)] font-en text-[0.8125rem] tracking-[0.1em] max-[960px]:px-6">
        © {site.nameEn}
      </p>
    </footer>
  );
}
