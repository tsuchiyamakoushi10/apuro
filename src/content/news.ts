/**
 * お知らせ。CMSを入れていないので、ここに書いた内容がそのまま出る。
 *
 * 増やすときは配列の先頭に足す（新しい順に並べる。並べ替えはしない）。
 * `date` は `YYYY-MM-DD`。画面には「2026年9月9日」の形で出る。
 * `body` は空行で段落が分かれる（原稿の改行はそのまま出る）。
 *
 * 例：
 * {
 *   date: "2026-04-01",
 *   title: "ホームページを公開しました",
 *   body: `本日、ホームページを公開しました。
 * サービスの内容や採用情報を掲載しています。`,
 * },
 */
export type NewsItem = {
  /** YYYY-MM-DD */
  date: string;
  title: string;
  body: string;
};

export const news: NewsItem[] = [];
