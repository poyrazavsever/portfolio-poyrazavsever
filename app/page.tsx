import { HeroSection } from "@/components/home/HeroSection";
import { YoutubeSection } from "@/components/home/YoutubeSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { BlogSection } from "@/components/home/BlogSection";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <YoutubeSection />
      <CoursesSection />
      <HowItWorksSection />
      <BlogSection />
    </div>
  );
}
