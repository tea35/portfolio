"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroBg from "@/components/HeroBg";
import { ease } from "@/lib/motion";

export default function NotFound() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dot = e.currentTarget.querySelector<HTMLDivElement>("#cursor-dot");
    if (dot)
      dot.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
  };
  return (
    <section
      className="h-screen w-full flex flex-col justify-center items-start px-[8vw] relative overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
    >
      <HeroBg />
      <div
        id="cursor-dot"
        className="pointer-events-none absolute top-0 left-0 w-3 h-3 rounded-full border border-foreground/60"
        style={{ willChange: "transform" }}
      />
      <div className="overflow-hidden mb-2">
        <motion.h2
          className="font-display text-[clamp(6rem,20vw,14rem)] tracking-tighter leading-none text-foreground"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          404
        </motion.h2>
      </div>

      <div className="overflow-hidden mb-8">
        <motion.p
          className="text-sm tracking-[0.15em] uppercase text-primary"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          Page Not Found
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
      >
        <Link
          href="/"
          className="text-sm tracking-[0.15em] text-foreground/40 hover:text-primary transition-colors"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </section>
  );
}
