import HeroSection from "@/components/sections/Hero";
import WorksSection from "@/components/sections/Works";
import AboutSection from "@/components/sections/About";

export default function HomePage() {
  return (
    <div className="w-full bg-background text-foreground selection:bg-primary/20">
      <HeroSection />
      <WorksSection />
      <AboutSection />
    </div>
  );
}
