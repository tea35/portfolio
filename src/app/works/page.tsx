"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, fadeLeft, stagger } from "@/lib/motion";
import { works } from "@/constants/works";

const vp = { once: true, margin: "-80px" } as const;

export default function WorksPage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-24 pb-24">
      {/* ヘッダー */}
      <div className="px-12 mb-16">
        <motion.div variants={fadeLeft} initial="hidden" animate="visible">
          <Link
            href="/"
            className="text-sm text-foreground/30 hover:text-primary transition-colors tracking-widest mb-8 inline-block"
          >
            ← Back
          </Link>
        </motion.div>
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Works
        </motion.h1>
      </div>

      {/* カード一覧 */}
      <motion.div
        className="px-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {works.map((work, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="bg-card border border-card-border rounded-xl p-8 flex flex-col justify-between h-[300px] hover:border-primary/50 transition-colors duration-300"
          >
            <div>
              <span className="text-sm font-mono text-foreground/40 block mb-3">
                {work.num} / {work.category}
              </span>
              <h2 className="text-2xl font-bold mb-4">{work.title}</h2>
              <p className="text-foreground/60 leading-relaxed text-sm">
                {work.description}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap mt-4">
              {work.tags.map((tag, tagIndex) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded text-sm font-mono"
                  style={
                    tagIndex === 0
                      ? {
                          color: "var(--color-primary)",
                          background: "rgba(168,200,74,0.08)",
                        }
                      : {
                          color: "inherit",
                          background: "rgba(255,255,255,0.05)",
                        }
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
