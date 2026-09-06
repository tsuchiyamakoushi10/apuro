import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/Section";
import { Pill } from "@/components/ui";
import { nav, site } from "@/config/site";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="ページが見つかりません" />

      <Section>
        <div className="wrap">
          <p>
            お探しのページは、移動または削除された可能性があります。
            お急ぎの場合は、お電話でもご相談を承っています。
          </p>

          <ul className="marker-list mt-10 text-[14px]">
            <li>
              <a href="/">トップページ</a>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <p className="mt-10">
            <Pill href={site.telHref}>お電話でご相談 {site.tel}</Pill>
          </p>
        </div>
      </Section>
    </>
  );
}
