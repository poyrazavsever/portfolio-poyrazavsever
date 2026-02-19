"use client";

import { MediaHero } from "@/components/futures/media/MediaHero";
import { EpisodeListItem } from "@/components/futures/media/EpisodeListItem";
import { Button } from "poyraz-ui/atoms";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock Data
const episodes = [
  {
    id: "12",
    title: "Yapay Zeka Çağında Yazılımcı Olmak",
    guest: "Ayşe Demir (AI Researcher)",
    date: "18 Ekim 2023",
    youtubeLink: "https://youtube.com",
  },
  {
    id: "11",
    title: "Startup vs Kurumsal: Kariyer Yolu",
    guest: "Mehmet Kaya (CTO)",
    date: "11 Ekim 2023",
    youtubeLink: "https://youtube.com",
  },
  {
    id: "10",
    title: "React Server Components Derinlemesine",
    guest: "Can Yücel (Frontend Lead)",
    date: "04 Ekim 2023",
    youtubeLink: "https://youtube.com",
  },
  {
    id: "09",
    title: "Freelance Çalışma Rehberi",
    guest: "Zeynep Sönmez (Freelance Dev)",
    date: "27 Eylül 2023",
    youtubeLink: "https://youtube.com",
  },
  {
    id: "08",
    title: "Go ile Microservices Mimarisi",
    guest: "Burak Öz (Backend Eng)",
    date: "20 Eylül 2023",
    youtubeLink: "https://youtube.com",
  },
];

export default function PastEpisodesPage() {
  return (
    <div className="min-h-screen pb-32 bg-white">

      <MediaHero
        title="Yayın Arşivi"
        subtitle="Kaçırdığınız tüm bölümleri YouTube üzerinden izleyebilirsiniz."
        className="pt-8 pb-16 border-b-0"
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="border-t border-dashed border-slate-200">
          {episodes.map((ep) => (
            <EpisodeListItem
              key={ep.id}
              episodeNumber={ep.id}
              title={ep.title}
              guest={ep.guest}
              date={ep.date}
              youtubeLink={ep.youtubeLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
