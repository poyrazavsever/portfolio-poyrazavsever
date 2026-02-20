/* eslint-disable @typescript-eslint/no-explicit-any */
﻿import { cookies } from "next/headers";
import { MediaHero } from "@/components/futures/media/MediaHero";
import { YazilimaDairClient } from "./YazilimaDairClient";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

export default async function YazilimaDairPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const t = dictionary.mediaYazilimaDair;

  const episodes = t.episodes.map((ep: any) => ({
    ...ep,
    youtubeLink: "https://youtube.com",
    spotifyLink: "https://spotify.com",
  }));

  return (
    <div className="min-h-screen pb-32 bg-white">
      <MediaHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        badge={t.hero.badge}
      />

      <YazilimaDairClient episodes={episodes} dictionary={dictionary} />
    </div>
  );
}

