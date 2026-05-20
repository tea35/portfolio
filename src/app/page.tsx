import Link from "next/link";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <section className="text-center py-20">
        <ScrollFadeIn>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Software Engineer
          </h1>
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-foreground/80 mb-8">
            Building robust and scalable web applications.
          </p>
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.4}>
          <Link
            href="/works"
            className="bg-primary text-background font-bold py-3 px-6 rounded-full hover:bg-primary/80 transition-colors duration-300"
          >
            View My Work
          </Link>
        </ScrollFadeIn>
      </section>
    </main>
  );
}
