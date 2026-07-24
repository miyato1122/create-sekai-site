// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// GitHub Pages プレビュー用に site / base を環境変数で上書きできるようにする
// （本番は既定値のまま。.github/workflows/preview-pages.yml 参照）
const site = process.env.SITE_URL ?? 'https://dev.create-sekai.com';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [vue(), sitemap()],
});
