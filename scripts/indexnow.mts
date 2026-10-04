/**
 * IndexNow で Bing ほかの検索エンジンにページの更新を知らせる。
 *
 * IndexNow に参加している検索エンジン（Bing・Yandex・Naver・Seznam・Yep）は通知を共有するので、
 * 1回送れば全部に届く。DuckDuckGo・Ecosia・米国Yahoo は Bing の結果を使っているため、これで載る。
 * Google と Yahoo! JAPAN は IndexNow に参加していない（Yahoo! JAPAN は Google の結果を使う）。
 * そちらは Search Console のサイトマップで足りる。
 *
 * 本番のデプロイが終わってから実行する。送るURLは本番の sitemap.xml から読むので、
 * ページを足したときも sitemap.ts に足してあればここは直さなくてよい。
 *
 *   npm run indexnow
 *
 * 鍵は public/<KEY>.txt に置いてあり、本番の https://www.apuro-nsst.com/<KEY>.txt で
 * 返っていないと受け付けられない。**鍵のファイルは消さない。**作り直したら KEY も合わせる。
 */
const KEY = "f1f2cb92e91174bdc395b3b7aa2e8d4d";
const HOST = "www.apuro-nsst.com";
const origin = `https://${HOST}`;

const sitemap = await fetch(`${origin}/sitemap.xml`).then((res) => {
  if (!res.ok) throw new Error(`sitemap.xml を取得できません: ${res.status}`);
  return res.text();
});
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error("sitemap.xml にURLがありません");

const keyRes = await fetch(`${origin}/${KEY}.txt`);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  throw new Error(`鍵のファイルが本番で返っていません: ${origin}/${KEY}.txt`);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList }),
});

// 200 は受付済み、202 は受け付けたが鍵の確認待ち。どちらも成功
if (res.status !== 200 && res.status !== 202) {
  throw new Error(`IndexNow が受け付けませんでした: ${res.status} ${await res.text()}`);
}
console.log(`IndexNow に ${urlList.length} 件を送りました（${res.status}）`);
for (const url of urlList) console.log(`  ${url}`);
