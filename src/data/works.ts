// Works セクションの実績データ。
// 仕様（§3）により CMS 化せず Astro 側にハードコードする。
// TODO(社長確認): products/ 配下の原稿から 2〜4 件を選定し、実データ（スクショ・説明・URL）に差し替える。

export type Work = {
  title: string;
  description: string;
  url?: string;
  /** public/images/works/ 配下のパス */
  image?: string;
};

export const WORKS: Work[] = [
  {
    title: 'さんごう防災3Dマップ',
    description: '3D地図上で防災情報を確認できるWebアプリ。', // TODO(社長確認): 実際の1行説明
    url: undefined, // TODO(社長確認): 公開URL
    image: undefined, // TODO(社長確認): スクリーンショットを public/images/works/ に配置
  },
  {
    title: 'Coming soon',
    description: '実績は順次追加予定です。', // TODO(社長確認): 2件目以降の実績を選定
  },
];
