"use client";

import { AboutHero } from "@/components/futures/about/AboutHero";
import { AboutJourney } from "@/components/futures/about/AboutJourney";
import { AboutValues } from "@/components/futures/about/AboutValues";
import { AboutEngineeringDesign } from "@/components/futures/about/AboutEngineeringDesign";
import { AboutInterests } from "@/components/futures/about/AboutInterests";

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      <AboutHero
        title="My Story &"
        highlight="Vision"
        description="I'm a full-stack developer and designer who believes in brutall honest design and clean code. Here is my journey."
        badge="Who am I?"
      />

      {/* Sections */}
      <AboutJourney />
      <AboutEngineeringDesign />
      <AboutValues />
      <AboutInterests />
    </div>
  );
}
