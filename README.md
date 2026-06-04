# portfolio

teaのポートフォリオサイト。ソフトウェアエンジニアとしての作品と経歴を紹介。

## 概要

- お茶をテーマにした若草色のデザイン
- 葉っぱが風に揺れるCanvasアニメーション
- Works・About・スキル一覧を掲載

## 工夫点

### デザイン・世界観
- ユーザー名「tea」にちなんだお茶をテーマにしたデザイン
- 若草色（#A8C84A）をアクセントカラーとして採用
- 彫刻的なフォント「Cinzel」で個性を表現

### アニメーション・エフェクト
- Canvasで実装したお茶の葉っぱが風に揺れる背景（HeroセクションHeroBg）

### CI/CD・開発環境
- GitHub ActionsでESLint・TypeScript型チェックを自動実行
- PRマージ時にVercelへ自動デプロイ

## 技術スタック
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/tea35/portfolio.git
cd portfolio

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

## スクリーンショット
### Hero
![Hero](docs/screenshots/hero.png)
