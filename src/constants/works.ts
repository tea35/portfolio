export type Work = {
  num: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
};

export const works: Work[] = [
  {
    num: "01",
    category: "Web Application",
    title: "TripList",
    description:
      "旅行の持ち物を最適化・管理するためのチェックリストツール。4人チームの開発リーダーとしてフロントエンドのロジック構築を担当。",
    tags: ["Next.js", "Supabase"],
  },
  {
    num: "02",
    category: "Browser Extension",
    title: "PopStack",
    description:
      "技術記事のリーディングリストを効率的に管理・ストックするためのChrome拡張機能。エンジニア向けの生産性向上ツール。",
    tags: ["TypeScript", "Chrome API"],
    link: "https://chromewebstore.google.com/detail/popstack/eeipadcdbpekegbpnknmfgpdgamapkij",
  },
];

export const WORKS_PREVIEW_COUNT = 3;
