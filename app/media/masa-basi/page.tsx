"use client";

import { MediaHero } from "@/components/futures/media/MediaHero";
import { UpcomingStreamCard } from "@/components/futures/media/UpcomingStreamCard";
import { Button, Typography } from "poyraz-ui/atoms";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MasaBasiPage() {
  return (
    <div className="min-h-screen pb-32 bg-white">
      <MediaHero
        title="Poyraz ile Masa Başı"
        subtitle="Sektörden konuklarla teknoloji, kariyer ve yazılım dünyasını konuştuğumuz haftalık canlı yayın serisi."
        badge="Her Çarşamba 20:00"
      />

      {/* Upcoming / Featured Stream */}
      <div className="container mx-auto px-4 max-w-6xl -mt-12 relative z-10 mb-20">
        <UpcomingStreamCard
          guestName="Burak Selim Şenyurt"
          guestRole="Software Architect / MVP"
          topic=".NET Dünyasında Neler Oluyor?"
          date="25 Ekim, Çarşamba"
          time="20:00"
          youtubeLink="https://youtube.com/@TheCodeMan"
          // guestImage="" // Using fallback for now
        />
      </div>

      {/* Intro / CTA Section */}
      <div className="container mx-auto px-4 max-w-3xl text-center mb-20">
        <Typography variant="h2" className="mb-4">
          Yayın Konsepti
        </Typography>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          &quot;Masa Başı&quot;, sadece teknik konuların değil, yazılımcıların gerçek
          hayat hikayelerinin, sektördeki zorlukların ve başarıların konuşulduğu
          samimi bir sohbet ortamıdır.
        </p>
        <div className="flex justify-center flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            variant="outline"
            className="border-slate-300 px-8"
            asChild
          >
            <Link href="/media/masa-basi/archive">
              Geçmiş Bölümleri İncele
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
