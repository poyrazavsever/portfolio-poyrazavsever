/* eslint-disable @typescript-eslint/no-unused-vars */
﻿import { cookies } from "next/headers";
import { MediaHero } from "@/components/futures/media/MediaHero";
import { UpcomingStreamCard } from "@/components/futures/media/UpcomingStreamCard";
import { Button, Typography } from "poyraz-ui/atoms";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export default async function MasaBasiPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const t = dictionary.mediaMasaBasi;
  const common = dictionary.mediaCommon.labels;

  return (
    <div className="min-h-screen pb-32 bg-white">
      <MediaHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        badge={t.hero.badge}
      />

      {/* Upcoming / Featured Stream */}
      <div className="container mx-auto px-4 max-w-6xl -mt-12 relative z-10 mb-20">
        <UpcomingStreamCard
          guestName="Burak Selim Åenyurt"
          guestRole="Software Architect / MVP"
          topic={t.upcoming.topic}
          date={t.upcoming.date}
          time={t.upcoming.time}
          youtubeLink="https://youtube.com/@TheCodeMan"
          dictionary={dictionary}
          // guestImage="" // Using fallback for now
        />
      </div>

      {/* Intro / CTA Section */}
      <div className="container mx-auto px-4 max-w-3xl text-center mb-20">
        <Typography variant="h2" className="mb-4">
          {t.intro.title}
        </Typography>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          {t.intro.description}
        </p>
        <div className="flex justify-center flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            variant="outline"
            className="border-slate-300 px-8"
            asChild
          >
            <Link href="/media/masa-basi/archive">
              {t.archive.viewPast}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

