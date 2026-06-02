"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const href = (hash: string) => (isHome ? hash : `/${hash}`);

  const navLinks = [
    { label: "Home", hash: "#home" },
    { label: "Works", hash: "#works" },
    { label: "About", hash: "#about" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-120 w-full border-b border-card bg-[rgba(17,17,17,0.8)] backdrop-blur-md">
        <div className="w-full mx-auto px-4 py-4 flex items-center">
          <h1 className="text-2xl font-bold">
            <Link href="/" className="no-underline text-foreground">
              My Portfolio
            </Link>
          </h1>

          <div className="grow" />

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-6 font-body">
            {navLinks.map(({ label, hash }) => (
              <Link
                key={label}
                href={href(hash)}
                className="no-underline text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap px-2 py-1"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ハンバーガーボタン */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="メニュー"
          >
            <motion.span
              className="block w-6 h-0.5 bg-foreground origin-center"
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-foreground"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-foreground origin-center"
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.6 }}
            />
          </button>
        </div>
      </header>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-90 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 z-100 h-full w-64 bg-[rgb(17,17,17)] border-l border-card flex flex-col pt-24 px-8 gap-8 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {navLinks.map(({ label, hash }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.3 + 0.2,
                    duration: 0.6,
                  }}
                >
                  <Link
                    href={href(hash)}
                    className="text-2xl font-display text-foreground/70 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
