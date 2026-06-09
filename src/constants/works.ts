export type Work = {
  num: string;
  category: string;
  title: string;
  descriptionKey: string;
  tags: string[];
  link?: string;
};

export const works: Work[] = [
  {
    num: "01",
    category: "Web Application",
    title: "TripList",
    descriptionKey: "triplist",
    tags: ["Next.js", "Supabase"],
  },
  {
    num: "02",
    category: "Browser Extension",
    title: "PopStack",
    descriptionKey: "popstack",
    tags: ["TypeScript", "Chrome API"],
    link: "https://chromewebstore.google.com/detail/popstack/eeipadcdbpekegbpnknmfgpdgamapkij",
  },
];

export const WORKS_PREVIEW_COUNT = 3;
