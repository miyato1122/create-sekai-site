// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: Github Pages が不要になれば以下を削除し、site / base を固定値に戻す
// GitHub Pages プレビュー用に site / base を環境変数で上書きできるようにする
// （本番は既定値のまま。.github/workflows/preview-pages.yml 参照）
const site = process.env.SITE_URL ?? 'https://dev.create-sekai.com';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
