// サイト全体で使う定数。
// TODO(社長確認): 名前・自己紹介・SNSリンクなどの実データは公開前に確認して差し替える。

export const SITE = {
  title: 'createSEKAI',
  // TODO(社長確認): 実名の表記（漢字・ローマ字）を確認
  author: '比嘉 智明', // プレースホルダ（メールアドレスからの推定。要確認）
  handle: 'createSEKAI',
  role: 'フリーランスエンジニア',
  description:
    'フリーランスエンジニア（屋号: createSEKAI）の個人サイト。Vue / TypeScript を中心としたフロントエンド開発、GIS・点群などの技術記事と実績を掲載しています。',
  email: 'tomoaki.higa@create-sekai.com',
  url: 'https://dev.create-sekai.com',
  // TODO(社長確認): 各SNSの実アカウントURLに差し替える
  social: {
    github: 'https://github.com/miyato1122',
    x: 'https://x.com/PLACEHOLDER',
    zenn: 'https://zenn.dev/PLACEHOLDER',
  },
  blogPageSize: 10,
} as const;

// TODO(社長確認): 3〜5行の自己紹介文の実データ
export const ABOUT_LINES = [
  'フリーランスエンジニアとして、Web フロントエンドを中心に開発をしています。',
  '主なスタックは Vue / TypeScript。GIS・3D点群の可視化など、地理空間データを扱うプロダクト開発の経験があります。',
  '屋号「createSEKAI」として活動中。お仕事のご相談は Contact からお気軽にどうぞ。',
];

// TODO(社長確認): スキルの実データを確認して調整する
export const SKILLS: { category: string; items: string[] }[] = [
  { category: 'Frontend', items: ['Vue 3', 'TypeScript', 'Nuxt', 'Astro', 'Tailwind CSS'] },
  { category: 'GIS / 3D', items: ['Cesium', 'MapLibre GL JS', '点群データ処理'] },
  { category: 'Backend / Infra', items: ['Node.js', 'Cloudflare Workers', 'GitHub Actions'] },
];
