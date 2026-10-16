// 内部メモ・設定ファイルを公開サイトから見えなくする関所。
// Cloudflare Pages では実在ファイルが _redirects より優先されるため、
// _redirects の 404 ルールでは塞げなかった（2026-10-16 確認）。
// 対象パスは _routes.json で絞っているので、通常ページではこの関数は動かない。

const BLOCKED = [
  /^\/[^/]+\.md$/i,          // ルート直下の .md（HANDOFF / LAUNCH / DESIGN / README など）
  /^\/automation\//i,        // 作業メモ
  /^\/\.github\//i,          // GitHub Actions の設定
  /^\/\.gitignore$/i,
];

export async function onRequest(context) {
  const path = new URL(context.request.url).pathname;
  if (BLOCKED.some((re) => re.test(path))) {
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }
  return context.next();
}
