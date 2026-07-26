import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

// robots.txt は静的ファイルにせず、Astro.site（= SITE_URL）から組み立てる。
//
// 本番以外（GitHub Pages プレビュー等）でも Disallow にはしない。
// Disallow するとクローラが HTML を取得できず、Base.astro が出力する
// noindex を読めないため、既にインデックスされた URL を削除できなくなる。
// 「クロールは許可 + noindex」が検索結果から確実に外す組み合わせ。
export const GET: APIRoute = ({ site }) => {
  const url = site!;
  const isProduction = url.hostname === SITE.productionHostname;

  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', url).href}\n`
    : `# 本番以外のデプロイ。全ページに noindex を出しているため、\n# それを読ませる目的でクロール自体は許可する。\nUser-agent: *\nAllow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
