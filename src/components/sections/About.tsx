"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeLeft, stagger } from "@/lib/motion";
import StackSphere from "@/components/StackSphere";

const vp = { once: true, margin: "-80px" } as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full flex flex-col justify-center px-12 py-16 space-y-10 bg-background relative z-10"
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
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <StackSphere />
        </motion.div>
      </div>
    </section>
  );
}
