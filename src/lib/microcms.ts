import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';

// ビルド時のみ使用する。クライアントサイドには露出させないこと。
const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
  tags?: Tag[];
  publishedAt: string;
  revisedAt?: string;
};

/**
 * microCMS の画像 URL に最適化パラメータを付与する。
 * microCMS の画像 API は imgix なので、WebP 変換とリサイズをクエリで指定できる。
 * 外部ホストの画像は astro:assets の対象外なので、こちらで転送量を抑える。
 */
export function optimizedImageUrl(
  url: string,
  { width, quality = 80 }: { width: number; quality?: number },
): string {
  const optimized = new URL(url);
  optimized.searchParams.set('fm', 'webp');
  optimized.searchParams.set('w', String(width));
  optimized.searchParams.set('q', String(quality));
  return optimized.toString();
}

const client =
  serviceDomain && apiKey ? createClient({ serviceDomain, apiKey }) : null;

if (!client) {
  console.warn(
    '[microcms] MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定のため、モックデータでビルドします。',
  );
}

// microCMS 未接続でもビルド・ローカル開発ができるようにするためのモックデータ
const mockTags: Tag[] = [
  { id: 'mock-tag-astro', name: 'Astro', slug: 'astro' },
  { id: 'mock-tag-vue', name: 'Vue', slug: 'vue' },
];

const mockBlogs: Blog[] = [
  {
    id: 'mock-1',
    title: '（サンプル）このサイトを Astro + microCMS で作った話',
    slug: 'sample-first-post',
    description:
      'microCMS 未接続時に表示されるサンプル記事です。環境変数を設定すると実データに置き換わります。',
    content:
      '<p>これはサンプル記事です。<code>MICROCMS_SERVICE_DOMAIN</code> と <code>MICROCMS_API_KEY</code> を設定してビルドすると、microCMS 上の記事が表示されます。</p><h2>見出しのサンプル</h2><p>本文のサンプルテキストです。リッチエディタの HTML がそのまま描画されます。</p>',
    eyecatch: undefined,
    tags: mockTags,
    publishedAt: '2026-07-01T00:00:00.000Z',
  },
  {
    id: 'mock-2',
    title: '（サンプル）2本目のテスト記事',
    slug: 'sample-second-post',
    description: 'ページネーションやタグページの確認用サンプル記事です。',
    content: '<p>2本目のサンプル記事です。</p>',
    eyecatch: undefined,
    tags: [mockTags[1]!],
    publishedAt: '2026-06-15T00:00:00.000Z',
  },
];

async function getAll<T>(endpoint: string): Promise<T[]> {
  if (!client) return [];
  const limit = 100;
  let offset = 0;
  const contents: T[] = [];
  for (;;) {
    const res = await client.getList<T>({
      endpoint,
      queries: { limit, offset, orders: '-publishedAt' } satisfies MicroCMSQueries,
    });
    contents.push(...res.contents);
    offset += limit;
    if (offset >= res.totalCount) break;
  }
  return contents;
}

let blogsCache: Blog[] | null = null;

/** 全記事を公開日降順で取得する（ビルド中はキャッシュ） */
export async function getAllBlogs(): Promise<Blog[]> {
  if (!client) return mockBlogs;
  if (!blogsCache) {
    blogsCache = await getAll<Blog>('blogs');
  }
  return blogsCache;
}

/** 全タグを取得する（記事に1件以上紐づくもののみ） */
export async function getUsedTags(): Promise<Tag[]> {
  const blogs = await getAllBlogs();
  const map = new Map<string, Tag>();
  for (const blog of blogs) {
    for (const tag of blog.tags ?? []) {
      map.set(tag.slug, tag);
    }
  }
  return [...map.values()];
}
