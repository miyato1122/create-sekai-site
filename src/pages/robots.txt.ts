import type { APIRoute } from 'astro';

/** 本番の正規ホスト。ここ以外へのデプロイは検索エンジンにインデックスさせない */
const PRODUCTION_HOSTNAME = 'create-sekai.com';

// robots.txt は静的ファイルにせず、Astro.site（= SITE_URL）から組み立てる。
// これにより GitHub Pages プレビューなど本番ホスト以外へのデプロイは自動で Disallow になり、
// 本番と同じ内容が別ドメインでインデックスされる（重複コンテンツ）のを防ぐ。
export const GET: APIRoute = ({ site }) => {
  const url = site!;
  const body =
    url.hostname === PRODUCTION_HOSTNAME
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', url).href}\n`
      : `User-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
