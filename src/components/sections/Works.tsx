"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ease, fadeLeft, fadeUp, stagger } from "@/lib/motion";
import { works } from "@/constants/works";
import Link from "next/link";

const vp = { once: true, margin: "-80px" } as const;

export default function WorksSection() {
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

  return (
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
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, ease, delay: i * 0.3 }}
            >
              <motion.div
                onMouseEnter={() => setActiveCard(i)}
                animate={{
                  opacity: activeCard !== null && activeCard !== i ? 0.4 : 1,
                  scale: activeCard !== null && activeCard !== i ? 0.97 : 1,
                  borderColor:
                    activeCard === i
                      ? "var(--color-primary)"
                      : "rgba(255,255,255,0.08)",
                }}
                transition={{ duration: 0.6, ease }}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="px-12 mt-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <Link
          href="/works"
          className="text-sm text-foreground/30 hover:text-primary transition-colors tracking-widest"
        >
          See more →
        </Link>
      </motion.div>
    </section>
  );
}
