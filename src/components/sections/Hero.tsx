"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

export default function HeroSection() {
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
    <section
      id="home"
      className="h-[80vh] w-full flex flex-col justify-center items-start px-12 relative overflow-hidden cursor-none"
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
          className="text-sm tracking-[0.15em] text-primary uppercase"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          Software Engineer
        </motion.p>
      </div>

      <div className="absolute bottom-8 right-12 text-xs tracking-widest text-foreground/20">
        Scroll ↓
      </div>
    </section>
  );
}
