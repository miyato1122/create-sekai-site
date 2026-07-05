# create-sekai-site

[createSEKAI](https://dev.create-sekai.com) の個人サイト（ブログ付き）。

- **フレームワーク**: [Astro](https://astro.build/)（SSG）+ [Vue 3](https://vuejs.org/)（islands: テーマトグルのみ）
- **CMS**: [microCMS](https://microcms.io/)（Hobbyプラン）
- **ホスティング**: Cloudflare Workers（静的アセット配信）
- **スタイリング**: 素のCSS（1カラム・ミニマル・ダークモード対応）

## 環境変数

| 変数名 | 説明 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスドメイン（`https://xxxx.microcms.io` の `xxxx`） |
| `MICROCMS_API_KEY` | microCMS の API キー |

`.env.example` をコピーして `.env` を作成する。**未設定の場合はモックデータでビルドされる**（ローカル開発・CI 用）。

```sh
cp .env.example .env
```

## ローカル起動

```sh
pnpm install
pnpm dev        # http://localhost:4321
```

```sh
pnpm build      # dist/ に静的ビルド
pnpm preview    # ビルド結果をローカル配信
```

## デプロイ

GitHub Actions（`.github/workflows/deploy.yml`）で自動デプロイする。

- **トリガー**: `main` への push / microCMS Webhook（`repository_dispatch`）/ 手動実行
- **フロー**: `astro build` → `wrangler deploy`（Workers 静的アセット）

### 必要な GitHub Actions Secrets

| Secret | 説明 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | 上記と同じ |
| `MICROCMS_API_KEY` | 上記と同じ |
| `CLOUDFLARE_API_TOKEN` | Workers 編集権限を持つ API トークン |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID |

手元からのデプロイも可能: `pnpm deploy`（要 `wrangler login`）。

### microCMS 公開 → 自動再ビルド

microCMS 管理画面の Webhook（カスタム通知）に GitHub API を設定する:

- URL: `https://api.github.com/repos/miyato1122/create-sekai-site/dispatches`
- ヘッダ: `Authorization: Bearer <repo権限を持つ fine-grained PAT>`, `Accept: application/vnd.github+json`
- ボディ: `{"event_type": "microcms_publish"}`

### 独自ドメイン

`dev.create-sekai.com` を Workers のカスタムドメインとして接続する（Cloudflare ダッシュボード > Workers > 設定 > ドメインとルート。メール用の既存 DNS レコードには触らない）。

## microCMS コンテンツモデル

Hobby プランで API 2 個を使用（管理画面で手動作成。フィールド ID は完全一致させること）。

### `blogs`（リスト形式）

| フィールドID | 表示名 | 種類 | 必須 |
|---|---|---|---|
| `title` | タイトル | テキストフィールド | ✔ |
| `slug` | スラッグ | テキストフィールド | ✔（英数字とハイフン） |
| `description` | 概要 | テキストエリア | ✔ |
| `content` | 本文 | リッチエディタ | ✔ |
| `eyecatch` | アイキャッチ | 画像 | − |
| `tags` | タグ | 複数コンテンツ参照（→ `tags`） | − |

### `tags`（リスト形式）

| フィールドID | 表示名 | 種類 | 必須 |
|---|---|---|---|
| `name` | タグ名 | テキストフィールド | ✔ |
| `slug` | スラッグ | テキストフィールド | ✔ |

## ディレクトリ構成

```
src/
  components/   … Astro/Vue コンポーネント（ThemeToggle.vue が唯一の island）
  data/         … サイト定数・Works データ（ハードコード）
  layouts/      … ベースレイアウト（OGP・JSON-LD・ダークモード）
  lib/          … microCMS クライアント（未接続時はモック）
  pages/        … ルーティング（トップ / blog / tags / rss / 404）
  styles/       … グローバル CSS
public/
  images/       … OG デフォルト画像など
```
