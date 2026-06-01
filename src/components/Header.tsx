"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const href = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <header className="fixed top-0 left-0 right-0 z-100 w-full border-b border-card bg-[rgba(17,17,17,0.8)] backdrop-blur-md">
      <div className="w-full mx-auto px-4 py-4 flex items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/" className="no-underline text-foreground">
            My Portfolio
          </Link>
        </h1>

        <div className="flex-grow" />

        <nav className="flex items-center gap-6 font-body">
          <Link
            href={href("#home")}
            className="no-underline text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap px-2 py-1"
          >
            Home
          </Link>
          <Link
            href={href("#works")}
            className="no-underline text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap px-2 py-1"
          >
            Works
          </Link>
          <Link
            href={href("#about")}
            className="no-underline text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap px-2 py-1"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
