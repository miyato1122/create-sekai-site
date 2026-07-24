// サイト全体で使う定数。

export const SITE = {
  title: 'createSEKAI',
  author: 'Tomoaki Higa',
  handle: 'createSEKAI',
  role: 'ソフトウェア＆GISエンジニア',
  description:
    'GISを中心としたソフトウェア開発を行なっているcreateSEKAIの事業サイトです。',
  email: 'contact@create-sekai.com',
  url: 'https://create-sekai.com',
  social: {
    github: 'https://github.com/miyato1122',
    x: 'https://x.com/htomo1122',
  },
  blogPageSize: 10,
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
    dates: '20XX年X月 - 現在',
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
    dates: '20XX年X月 - 20XX年X月',
    description: ['ECサイト・CRM・スマートフォンアプリの運用管理を担当。'],
  },
  {
    company: '国際航業株式会社',
    dates: '20XX年X月 - 20XX年X月',
    description: ['自治体向けGIS（統合型GIS/公開型GIS/防災GIS/上下水GIS/etc..）の導入を担当。','GISデータの作成・加工も行う。'],
  }
];
