import { HeroSection } from "@/components/futures/home/HeroSection";
import { YoutubeSection } from "@/components/futures/home/YoutubeSection";
import { CoursesSection } from "@/components/futures/home/CoursesSection";
import { HowItWorksSection } from "@/components/futures/home/HowItWorksSection";
import { BlogSection } from "@/components/futures/home/BlogSection";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <CoursesSection />
      <YoutubeSection />
      <BlogSection />
    </div>
  );
}
