"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ease, fadeLeft, fadeUp } from "@/lib/motion";
import { works } from "@/constants/works";

const vp = { once: true, margin: "-80px" } as const;

export default function WorksSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [centerOffset, setCenterOffset] = useState(0);

  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const next = () => setCurrentIndex((i) => Math.min(i + 1, works.length));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  useEffect(() => {
    const updateSize = () => {
      if (cardRef.current) {
        const w = cardRef.current.offsetWidth;
        setCardWidth(w);
        setCenterOffset((window.innerWidth - w) / 2);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    if (cardRef.current) resizeObserver.observe(cardRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section
      id="works"
      className="relative w-full bg-background border-y border-card/30 py-24"
    >
      <div className="px-[8vw] mb-8">
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

      {/* カードエリア */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex gap-4"
          animate={{
            x: -(currentIndex * (cardWidth + 16)) + centerOffset,
          }}
          transition={{ duration: 0.6, ease }}
        >
          {works.map((work, i) => (
            <motion.div
              ref={i === 0 ? cardRef : undefined}
              key={i}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
              animate={{
                opacity: i === currentIndex ? 1 : 0.3,
                scale: i === currentIndex ? 1 : 0.8,
                borderColor:
                  i === currentIndex
                    ? "var(--color-primary)"
                    : "rgba(255,255,255,0.08)",
              }}
              transition={{ duration: 1.0, ease }}
              className={`relative flex-shrink-0 w-[min(80vw,480px)] h-[40vh] md:h-[50vh] rounded-xl border bg-card overflow-hidden cursor-pointer ${
                i === currentIndex
                  ? "card-border-active border-transparent"
                  : "border-white/8"
              }`}
            >
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-[2]">
                <div>
                  <span className="text-sm font-mono text-foreground/40 block mt-2">
                    {work.num} / {work.category}
                  </span>
                  <h4 className="text-xl md:text-2xl font-bold mt-3">
                    {work.title}
                  </h4>
                  <p className="text-foreground/60 mt-4 leading-relaxed text-sm">
                    {work.description}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded text-sm font-mono"
                      style={{
                        color: "var(--color-primary)",
                        background: "rgba(168,200,74,0.08)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* See more カード */}
          <motion.div
            animate={{
              opacity: currentIndex === works.length ? 1 : 0.3,
              scale: currentIndex === works.length ? 1 : 0.8,
              borderColor:
                currentIndex === works.length
                  ? "var(--color-primary)"
                  : "rgba(168,200,74,0.25)",
            }}
            transition={{ duration: 1.0, ease }}
            className={`relative flex-shrink-0 w-[min(80vw,480px)] h-[40vh] md:h-[50vh] rounded-xl border overflow-hidden cursor-pointer ${
              currentIndex === works.length
                ? "card-border-active border-transparent"
                : "border-dashed"
            }`}
            style={{
              borderColor:
                currentIndex === works.length
                  ? "var(--color-primary)"
                  : "rgba(168,200,74,0.25)",
            }}
          >
            <Link
              href="/works"
              className="w-full h-full flex flex-col items-center justify-center gap-3 group"
            >
              <span
                className="text-xs tracking-[0.2em] font-mono z-[2]"
                style={{ color: "rgba(168,200,74,0.5)" }}
              >
                SEE MORE
              </span>
              <span
                className="text-4xl transition-transform duration-300 group-hover:scale-110 z-[2]"
                style={{ color: "rgba(168,200,74,0.5)" }}
              >
                +
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ナビゲーション */}
      <motion.div
        className="flex items-center justify-center gap-6 mt-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="w-10 h-10 rounded-full border border-card-border flex items-center justify-center text-foreground/40 hover:border-primary hover:text-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <div className="flex gap-2">
          {[...works.map((_, i) => i), works.length].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background:
                  i === currentIndex
                    ? "var(--color-primary)"
                    : "rgba(255,255,255,0.2)",
                transform: i === currentIndex ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={currentIndex === works.length}
          className="w-10 h-10 rounded-full border border-card-border flex items-center justify-center text-foreground/40 hover:border-primary hover:text-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
        >
          →
        </button>
      </motion.div>
    </section>
  );
}
