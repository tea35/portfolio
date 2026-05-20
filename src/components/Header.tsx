import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-background border-b border-card">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">My Portfolio</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/works"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Works
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
