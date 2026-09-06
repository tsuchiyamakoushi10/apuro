/**
 * src/config/site.ts に残った【調整中】を検出する。
 *
 * 失敗させるのは「公開スイッチが入った本番ビルド」と CHECK_TBD_STRICT=1 のときだけ。
 * published = false の間は確認用のデプロイなので、本番環境でも警告のみで通す。
 * 公開前チェックは CHECK_TBD_STRICT=1 npm run build で手前に実行できる。
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = join(root, "src/config/site.ts");
const source = readFileSync(configPath, "utf8");

const TBD = "【調整中】";

/** site.ts の公開スイッチ。true なら実公開なので未確定値を許さない */
const published = /export const published = true/.test(source);
const strict =
  (process.env.VERCEL_ENV === "production" && published) ||
  process.env.CHECK_TBD_STRICT === "1";

const hits: { line: number; text: string }[] = [];
source.split("\n").forEach((raw, i) => {
  const text = raw.trim();
  // コメント行と TBD 定数の宣言行そのものは除く
  if (text.startsWith("*") || text.startsWith("//") || text.startsWith("/*")) return;
  if (text.includes("export const TBD")) return;
  if (text.includes(TBD) || text.includes("${TBD}")) {
    hits.push({ line: i + 1, text });
  }
});

const copyUnconfirmed = /confirmed:\s*false/.test(source);

if (hits.length === 0 && !copyUnconfirmed) {
  console.log("check-tbd: 未確定項目はありません。");
  process.exit(0);
}

const label = strict ? "ERROR" : "WARN";
console.log(`\n${label} check-tbd: 未確定の項目が残っています。\n`);

for (const hit of hits) {
  console.log(`  src/config/site.ts:${hit.line}  ${hit.text}`);
}
if (copyUnconfirmed) {
  console.log("  src/config/site.ts  copy.confirmed = false（キャッチコピーの選択待ち）");
}

console.log("\n  詳細は docs/spec.md「8. クライアント確認待ちの項目」を参照。");

if (strict) {
  console.log("  本番公開はできません。確定値を入れてから再実行してください。\n");
  process.exit(1);
}
console.log(
  published
    ? "  確認用ビルドのため続行します。\n"
    : "  published = false（未公開）のため続行します。\n",
);
