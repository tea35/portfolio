import Image from "next/image";
import Link from "next/link";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";

const works = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A web application for managing tasks and projects.",
    imageUrl: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    id: 2,
    title: "Project Beta",
    description: "An e-commerce site with a modern design.",
    imageUrl: "https://via.placeholder.com/400x300",
    link: "#",
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "A personal blog platform with a custom CMS.",
    imageUrl: "https://via.placeholder.com/400x300",
    link: "#",
  },
];

const WorksPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <ScrollFadeIn>
        <h1 className="text-3xl font-bold mb-8 text-center">My Works</h1>
      </ScrollFadeIn>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work, index) => (
          <ScrollFadeIn key={work.id} delay={index * 0.2}>
            <div className="bg-card rounded-lg border border-card overflow-hidden h-full flex flex-col">
              {/* <Image
                src={work.imageUrl}
                alt={work.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              /> */}
              <div className="w-full h-48 bg-secondary" />
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2">{work.title}</h2>
                <p className="text-foreground/80 mb-4 flex-grow">
                  {work.description}
                </p>
                <Link
                  href={work.link}
                  className="text-primary hover:underline mt-auto"
                >
                  View Details
                </Link>
              </div>
            </div>
          </ScrollFadeIn>
        ))}
      </div>
    </div>
  );
};

export default WorksPage;
