import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Software Engineer
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Building robust and scalable web applications.
        </p>
        <Link
          href="/works"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          View My Work
        </Link>
      </section>
    </main>
  );
}
