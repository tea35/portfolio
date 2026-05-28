"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ease, fadeUp, fadeLeft, fadeScale, stagger } from "@/lib/motion";
import StackSphere from "@/components/StackSphere";

const vp = { once: true, margin: "-80px" } as const;

type Work = {
  num: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
};

const works: Work[] = [
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
  },
  {
    num: "03",
    category: "Autonomous Driving",
    title: "Surround Depth Estimation",
    description: "自動運転技術",
    tags: ["Python", "PyTorch"],
  },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!container || !scrollSection) return;

    let currentTranslateX = 0;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const maxScrollLeft = scrollSection.scrollWidth - window.innerWidth;
      const isLocked = rect.top <= 10 && rect.bottom >= window.innerHeight;

      if (isLocked) {
        if (e.deltaY > 0 && currentTranslateX > -maxScrollLeft) {
          e.preventDefault();
          window.scrollTo({ top: container.offsetTop, behavior: "auto" });
          currentTranslateX = Math.max(
            currentTranslateX - e.deltaY,
            -maxScrollLeft,
          );
          scrollSection.style.transform = `translateX(${currentTranslateX}px)`;
          return;
        }
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const spotlight =
      e.currentTarget.querySelector<HTMLDivElement>("#spotlight");
    const dot = e.currentTarget.querySelector<HTMLDivElement>("#cursor-dot");
    if (spotlight) {
      spotlight.style.left = `${x}px`;
      spotlight.style.top = `${y}px`;
    }
    if (dot) {
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    }
  };

  return (
    <div className="w-full bg-background text-foreground selection:bg-primary/20">
      {/* ===== Hero ===== */}
      <section
        id="home"
        className="h-screen w-full flex flex-col justify-center items-start px-12 relative overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
      >
        <div
          id="spotlight"
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full transition-[top,left] duration-75"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          id="cursor-dot"
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-foreground/60 transition-[top,left] duration-[40ms]"
        />

        <div className="overflow-hidden mb-2">
          <motion.h2
            className="text-[clamp(4rem,14vw,10rem)] font-extrabold tracking-tighter leading-none"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            tea
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.p
            className="text-sm tracking-[0.15em] text-foreground/40 uppercase"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            Information Science Engineer & Researcher
          </motion.p>
        </div>

        <div className="absolute bottom-8 right-12 text-xs tracking-widest text-foreground/20">
          Scroll ↓
        </div>
      </section>

      {/* ===== Works ===== */}
      <section
        ref={containerRef}
        id="works"
        className="relative h-[120vh] w-full overflow-hidden bg-background border-y border-card/30"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          <div className="px-12 mb-8">
            <motion.h3
              className="text-3xl font-bold border-l-4 border-primary pl-4"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              Works
            </motion.h3>
          </div>

          <motion.div
            ref={scrollSectionRef}
            className="flex gap-4 px-12 w-max items-stretch"
            onMouseLeave={() => setActiveCard(null)}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {works.map((work, i) => (
              <motion.div
                key={i}
                variants={fadeScale}
                onMouseEnter={() => setActiveCard(i)}
                animate={{
                  opacity: activeCard !== null && activeCard !== i ? 0.4 : 1,
                  scale: activeCard !== null && activeCard !== i ? 0.97 : 1,
                  borderColor:
                    activeCard === i
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(255,255,255,0.08)",
                }}
                transition={{ duration: 0.3, ease }}
                className="relative h-[50vh] rounded-xl border bg-card overflow-hidden cursor-pointer"
                style={{ width: "min(45vw, 480px)" }}
              >
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-mono text-foreground/40 block mt-2">
                      {work.num} / {work.category}
                    </span>
                    <h4 className="text-2xl font-bold mt-3">{work.title}</h4>
                    <p className="text-foreground/60 mt-4 leading-relaxed text-sm">
                      {work.description}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-foreground/5 px-3 py-1 rounded text-sm font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section
        id="about"
        className="min-h-screen w-full flex flex-col justify-center px-12 py-16 max-w-5xl mx-auto space-y-10 bg-background relative z-10"
      >
        <div>
          <motion.h3
            className="text-3xl font-bold border-l-4 border-primary pl-4 mb-8"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            About Me
          </motion.h3>
          <motion.p
            className="text-lg text-foreground/80 leading-relaxed max-w-3xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            情報科学分野のエンジニア
          </motion.p>
        </div>

        <div>
          <motion.h3
            className="text-2xl font-bold mb-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            Technical Stacks
          </motion.h3>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <StackSphere />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
