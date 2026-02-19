import { HeroSection } from "@/components/home/HeroSection";
import { YoutubeSection } from "@/components/home/YoutubeSection";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <YoutubeSection />
    </div>
  );
}
