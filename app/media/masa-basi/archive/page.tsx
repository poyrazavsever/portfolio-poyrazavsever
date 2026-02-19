"use client";

import { MediaHero } from "@/components/futures/media/MediaHero";
import { MediaListItem } from "@/components/futures/media/MediaListItem";
import { MediaSheet, MediaItem } from "@/components/futures/media/MediaSheet";
import { Button } from "poyraz-ui/atoms";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const episodes: (MediaItem & { guest: string })[] = [
  {
    id: "1",
    title: ".NET Dünyasında Neler Oluyor?",
    guest: "Burak Selim Şenyurt",
    date: "25 Ekim 2023",
    youtubeLink: "https://youtube.com",
    content: `
# Bölüm Özeti

Burak Selim Şenyurt ile .NET dünyasındaki son gelişmeleri, .NET 8 ile gelen yenilikleri ve Microsoft ekosistemindeki değişimi konuştuk.

## Konuşulan Konular
- .NET 8 Performans İyileştirmeleri
- Blazor United (yeni render modları)
- C# 12 Özellikleri
- Bulut tabanlı geliştirme (Azure)

## Konuk Hakkında
Burak Selim Şenyurt, uzun yıllardır sektörde olan, MVP ödüllü bir yazılım mimarıdır.

[Burak Selim Şenyurt Blog](https://buraksenyurt.com)
    `,
  },
  {
    id: "2",
    title: "Frontend Dünyasında Kariyer",
    guest: "Adem İlter",
    date: "18 Ekim 2023",
    youtubeLink: "https://youtube.com",
    content: `
# Bölüm Özeti

Adem İlter ile frontend geliştirme süreçlerini, CSS'in evrimini ve modern web teknolojilerini masaya yatırdık.

## Konuşulan Konular
- React vs Vue vs Svelte
- Tailwind CSS kullanımı
- Kariyer tavsiyeleri
- Topluluk oluşturma

## Konuk Hakkında
Adem İlter, frontend dünyasında bilinen, eğitimler veren ve topluluklara katkı sağlayan bir geliştiricidir.
    `,
  },
  {
    id: "3",
    title: "Yapay Zeka ve Yazılımın Geleceği",
    guest: "Daron Yöndem",
    date: "11 Ekim 2023",
    youtubeLink: "https://youtube.com",
    content: `
# Bölüm Özeti

Daron Yöndem ile yapay zekanın yazılım sektörüne etkilerini ve gidişatı konuştuk.

## Konuşulan Konular
- Generative AI
- Copilot araçları
- Yazılımcıların rolü değişiyor mu?
- Azure OpenAI servisleri

## Konuk Hakkında
Daron Yöndem, Microsoft Regional Director ve Azure MVP olarak görev yapmaktadır.
    `,
  },
];

export default function PastEpisodesPage() {
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
        title="Yayın Arşivi"
        subtitle="Geçmiş canlı yayın kayıtlarını buradan izleyebilir ve bölüm notlarına ulaşabilirsiniz."
        badge="Archive"
      />

      <div className="container mx-auto px-4 max-w-4xl pt-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-900 -ml-2"
            asChild
          >
            <Link href="/media/masa-basi">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Canlı Yayın Sayfası
            </Link>
          </Button>
        </div>

        <div className="border-t border-dashed border-slate-200">
          {episodes.map((ep) => (
            <MediaListItem
              key={ep.id}
              id={ep.id}
              title={ep.title}
              guest={ep.guest}
              date={ep.date}
              onDetailsClick={() => handleDetailsClick(ep)}
            />
          ))}
        </div>
      </div>

      <MediaSheet
        item={selectedEpisode}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        badgePrefix="ARCHIVE"
      />
    </div>
  );
}
