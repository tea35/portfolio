import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-card">
      <div className="w-full mx-auto px-4 py-4 flex items-center">
        <h1 className="text-2xl font-bold">
          <Link href="#home" className="no-underline text-foreground">
            My Portfolio
          </Link>
        </h1>
        <div className="flex-grow" />
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link
            href="#home"
            className="no-underline text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap px-2 py-1"
          >
            Home
          </Link>
          <Link
            href="#works"
            className="no-underline text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap px-2 py-1"
          >
            Works
          </Link>
          <Link
            href="#about"
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
