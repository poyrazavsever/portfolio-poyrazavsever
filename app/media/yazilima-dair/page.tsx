"use client";

import { MediaHero } from "@/components/futures/media/MediaHero";
import { MediaListItem } from "@/components/futures/media/MediaListItem";
import { MediaSheet, MediaItem } from "@/components/futures/media/MediaSheet";
import { useState } from "react";

const episodes: MediaItem[] = [
  {
    id: "42",
    title: "Yazılım Sektöründe Kriz Yönetimi ve Adaptasyon",
    date: "24 Ekim 2023",
    youtubeLink: "https://youtube.com",
    spotifyLink: "https://spotify.com",
    content: `
# Bölüm Hakkında

Bu bölümde yazılım sektöründeki son gelişmeleri ve kriz anlarında nasıl hareket edilmesi gerektiğini konuştuk.

## Konu Başlıkları

- Global ekonomik dalgalanmaların remote çalışmaya etkisi
- Junior geliştiriciler için kriz dönemi tavsiyeleri
- Tech stack seçiminde "hype" tuzağına düşmemek

> "Kriz dönemleri, yetkinliklerini derinleştirenler için en büyük fırsattır."

## Bahsedilen Kaynaklar

1. [The Tech Crisis Survival Guide](https://example.com)
2. [Adaptability in Engineering](https://example.com)

Bu bölümü beğendiyseniz paylaşmayı unutmayın!
    `,
  },
  {
    id: "41",
    title: "Next.js 14 ve Sunucu Tarafı Devrimi",
    date: "17 Ekim 2023",
    youtubeLink: "https://youtube.com",
    spotifyLink: "https://spotify.com",
    content: `
# Next.js 14 Neler Getiriyor?

Server Actions stabil hale geldi! Artık API route yazmadan form handle etmek mümkün.

## Öne Çıkan Özellikler
* **Server Actions:** Form yönetimi artık çok daha kolay.
* **Partial Prerendering:** Hibrit rendering stratejisi.
* **Turbopack:** Webpack'in yerini alıyor.

Detaylı inceleme için blog yazımıza göz atabilirsiniz.
    `,
  },
  {
    id: "40",
    title: "Neden Senior Mühendis Bulmak Zor?",
    date: "10 Ekim 2023",
    youtubeLink: "https://youtube.com",
    content: `
# Senior Olmak Ne Demek?

Sadece kod yazmak değil, problem çözmek ve sorumluluk almak.

* Soft skill'lerin önemi
* Mentörlük kültürü
* Legacy kod ile başa çıkma stratejileri
    `,
  },
];

export default function YazilimaDairPage() {
  const [selectedEpisode, setSelectedEpisode] = useState<MediaItem | null>(
    null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleDetailsClick = (episode: MediaItem) => {
    setSelectedEpisode(episode);
    setIsSheetOpen(true);
  };

  return (
    <div className="min-h-screen pb-32 bg-white">
      <MediaHero
        title="Poyraz ile Yazılıma Dair"
        subtitle="Teknoloji gündemi, kişisel deneyimler ve yazılım dünyasına dair solo analizler."
        badge="Podcast Series"
      />

      <div className="container mx-auto px-4 max-w-4xl pt-8">
        <div className="border-t border-dashed border-slate-200">
          {episodes.map((ep) => (
            <MediaListItem
              key={ep.id}
              id={ep.id}
              title={ep.title}
              date={ep.date}
              duration="45 dk" // Mock Data fix for example
              onDetailsClick={() => handleDetailsClick(ep)}
            />
          ))}
        </div>
      </div>

      <MediaSheet
        item={selectedEpisode}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        badgePrefix="EPISODE"
      />
    </div>
  );
}
