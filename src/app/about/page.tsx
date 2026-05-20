const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">About Me</h1>
      <div className="max-w-3xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            ここに自己紹介文が入ります。これまでの経歴や、エンジニアとしての強み、今後の目標などを記述します。
            趣味や好きなことなど、人柄が伝わる内容を加えても良いでしょう。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-card text-foreground/80 text-sm font-medium px-3 py-1 rounded-full">
              JavaScript
            </span>
            <span className="bg-card text-foreground/80 text-sm font-medium px-3 py-1 rounded-full">
              TypeScript
            </span>
            <span className="bg-card text-foreground/80 text-sm font-medium px-3 py-1 rounded-full">
              React
            </span>
            <span className="bg-card text-foreground/80 text-sm font-medium px-3 py-1 rounded-full">
              Next.js
            </span>
            <span className="bg-card text-foreground/80 text-sm font-medium px-3 py-1 rounded-full">
              Node.js
            </span>
            <span className="bg-card text-foreground/80 text-sm font-medium px-3 py-1 rounded-full">
              Tailwind CSS
            </span>
            <span className="bg-card text-foreground/80 text-sm font-medium px-3 py-1 rounded-full">
              Git/GitHub
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
