// TODO: Github Pages が不要になればファイルを削除する
// GitHub Pages プレビュー（サブパス配信）でもリンクが壊れないよう、
// サイト内リンクは必ずこのヘルパーを通す。
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** ルート相対パスにベースパスを付与する（例: href('/blog/') → '/create-sekai-site/blog/'） */
export const href = (path: string): string => `${base}${path}`;
