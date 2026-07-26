// サイト全体で使う定数。

export const SITE = {
  title: 'createSEKAI',
  author: 'Tomoaki Higa',
  handle: 'createSEKAI',
  role: 'ソフトウェア＆GISエンジニア',
  description:
    'GISを中心にソフトウェア開発を行うフリーランスエンジニアの事業サイトです。自治体向け防災GIS・上下水道GIS・電力会社向けGISの開発実績があり、Vue.js / Nuxt / TypeScript を用いたフロントエンド開発やサイト制作もご相談いただけます。',
  email: 'contact@create-sekai.com',
  // NOTE: サイトのURLはここに持たない。canonical / OGP / JSON-LD すべて Astro.site
  // （= astro.config.mjs の site。環境変数 SITE_URL で上書き可）を単一の情報源とする。
  //
  // productionHostname は URL ではなく「このデプロイが本番かどうか」の判定用。
  // Astro.site 自体が判定対象なので、そこからは導出できず定数として持つ必要がある。
  // 本番以外（GitHub Pages プレビュー等）は noindex を出して検索結果から除外する。
  productionHostname: 'create-sekai.com',
  social: {
    github: 'https://github.com/miyato1122',
    x: 'https://x.com/htomo1122',
  },
  /** X のユーザー名（@ 付き）。twitter:site / twitter:creator に使う */
  xHandle: '@htomo1122',
  blogPageSize: 10,
  /** 事業として対応できる領域。JSON-LD の knowsAbout に使う */
  knowsAbout: [
    '地理情報システム (GIS)',
    '防災GIS',
    '上下水道GIS',
    'Web アプリケーション開発',
    'Vue.js',
    'Nuxt',
    'TypeScript',
  ],
} as const;

export const ABOUT_LINES = [
  'GISを中心としたソフトウェア開発を行なっています。',
  'GIS以外にも、Vue.js / Nuxt / TypeScript を用いたソフトウェアのフロントエンド開発、サイト制作も行なっています。',
];

export const CAREERS: {
  company: string;
  dates: string;
  description: string[];
}[] = [
  {
    company: 'フリーランス',
    dates: '2021年1月 - 現在',
    description: [
      '業務委託で主に以下のソフトウェアを開発。 ',
      '・電力会社向けGIS',
      '・自治体向け防災GIS',
      '・自治体向け開発許可GIS',
      '・受発注システム',
      '・企業HP制作',
    ],
  },
  {
    company: '株式会社アーバンリサーチ',
    dates: '2019年4月 - 2020年12月',
    description: ['ECサイト・CRM・スマートフォンアプリの運用管理を担当。'],
  },
  {
    company: '国際航業株式会社',
    dates: '2014年4月 - 2019年3月',
    description: ['自治体向けGIS（統合型GIS/公開型GIS/防災GIS/上下水GIS/etc..）の導入を担当。','GISデータの作成・加工も行う。'],
  }
];
