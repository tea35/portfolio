"use client";

import { useEffect, useRef } from "react";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!container || !scrollSection) return;

    let currentTranslateX = 0;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const maxScrollLeft = scrollSection.scrollWidth - window.innerWidth;

      // 確定でぶつかる境界：Worksセクションの頭が画面最上部（y=0）に達しているか判定
      const isLocked = rect.top <= 10 && rect.bottom >= window.innerHeight;

      if (isLocked) {
        // 下スクロールで、まだ右端まで回りきっていない場合
        if (e.deltaY > 0 && currentTranslateX > -maxScrollLeft) {
          e.preventDefault();
          // 画面自体をWorksの頭（要素の絶対座標）に強制スナップさせて縦スクロールを完全に溜める
          window.scrollTo({ top: container.offsetTop, behavior: "auto" });

          currentTranslateX = Math.max(
            currentTranslateX - e.deltaY,
            -maxScrollLeft,
          );
          scrollSection.style.transform = `translateX(${currentTranslateX}px)`;
          return;
        }

        // 上スクロールで、まだ初期位置（左端）に戻りきっていない場合
        if (e.deltaY < 0 && currentTranslateX < 0) {
          e.preventDefault();
          window.scrollTo({ top: container.offsetTop, behavior: "auto" });

          currentTranslateX = Math.min(currentTranslateX - e.deltaY, 0);
          scrollSection.style.transform = `translateX(${currentTranslateX}px)`;
          return;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="w-full bg-background text-foreground selection:bg-primary/20">
      <section
        id="home"
        className="h-screen w-full flex flex-col justify-center items-center px-4"
      >
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            tea
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 font-medium">
            Information Science Engineer & Researcher
          </p>
        </div>
      </section>

      {/* h-[200vh] で縦のスクロール量を貯めるレールを確保 */}
      <section
        ref={containerRef}
        id="works"
        className="relative h-[200vh] w-full overflow-hidden overflow-y-visible scrollbar-none bg-background border-y border-card/30"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          <div className="px-12 mb-8">
            <h3 className="text-3xl font-bold border-l-4 border-primary pl-4">
              Works
            </h3>
          </div>

          <div ref={scrollSectionRef} className="flex gap-12 px-12 w-max">
            <div className="w-[80vw] md:w-[45vw] h-[50vh] bg-card border border-card-border rounded-xl p-8 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-sm font-mono text-foreground/40">
                  01 / Web Application
                </span>
                <h4 className="text-2xl font-bold mt-2">TripList</h4>
                <p className="text-foreground/70 mt-4 leading-relaxed">
                  旅行の持ち物を最適化・管理するためのチェックリストツール。4人チームの開発リーダーとしてフロントエンドのロジック構築を担当。
                </p>
              </div>
              <div className="flex gap-2">
                <span className="bg-foreground/5 px-3 py-1 rounded text-sm font-mono">
                  Next.js
                </span>
                <span className="bg-foreground/5 px-3 py-1 rounded text-sm font-mono">
                  Supabase
                </span>
              </div>
            </div>

            <div className="w-[80vw] md:w-[45vw] h-[50vh] bg-card border border-card-border rounded-xl p-8 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-sm font-mono text-foreground/40">
                  02 / Browser Extension
                </span>
                <h4 className="text-2xl font-bold mt-2">PopStack</h4>
                <p className="text-foreground/70 mt-4 leading-relaxed">
                  技術記事のリーディングリストを効率的に管理・ストックするためのChrome拡張機能。エンジニア向けの生産性向上ツール。
                </p>
              </div>
              <div className="flex gap-2">
                <span className="bg-foreground/5 px-3 py-1 rounded text-sm font-mono">
                  TypeScript
                </span>
                <span className="bg-foreground/5 px-3 py-1 rounded text-sm font-mono">
                  Chrome API
                </span>
              </div>
            </div>

            <div className="w-[80vw] md:w-[45vw] h-[50vh] bg-card border border-card-border rounded-xl p-8 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-sm font-mono text-foreground/40">
                  03 / Autonomous Driving
                </span>
                <h4 className="text-2xl font-bold mt-2">
                  Surround Depth Estimation
                </h4>
                <p className="text-foreground/70 mt-4 leading-relaxed">
                  自動運転技術
                </p>
              </div>
              <div className="flex gap-2">
                <span className="bg-foreground/5 px-3 py-1 rounded text-sm font-mono">
                  Python
                </span>
                <span className="bg-foreground/5 px-3 py-1 rounded text-sm font-mono">
                  PyTorch
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="min-h-screen w-full flex flex-col justify-center px-12 py-24 max-w-5xl mx-auto space-y-16 bg-background relative z-10"
      >
        <div>
          <h3 className="text-3xl font-bold border-l-4 border-primary pl-4 mb-8">
            About Me
          </h3>
          <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
            情報科学分野のエンジニア
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6">Technical Stacks</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-card-border p-4 rounded-lg text-center font-medium">
              React / Next.js
            </div>
            <div className="bg-card border border-card-border p-4 rounded-lg text-center font-medium">
              TypeScript
            </div>
            <div className="bg-card border border-card-border p-4 rounded-lg text-center font-medium">
              Tailwind CSS
            </div>
            <div className="bg-card border border-card-border p-4 rounded-lg text-center font-medium">
              Supabase
            </div>
            <div className="bg-card border border-card-border p-4 rounded-lg text-center font-medium">
              Python / PyTorch
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
