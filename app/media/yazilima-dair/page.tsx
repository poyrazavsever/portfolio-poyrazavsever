/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { MediaHero } from "@/components/futures/media/MediaHero";
import { YazilimaDairClient } from "./YazilimaDairClient";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getPublishedEpisodes } from "@/lib/supabase/queries/media";

export default async function YazilimaDairPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const t = dictionary.mediaYazilimaDair;

  const supabaseEpisodes = await getPublishedEpisodes("yazilima_dair");

  // Supabase'den veri varsa onu kullan, yoksa dictionary fallback
  const episodes =
    supabaseEpisodes.length > 0
      ? supabaseEpisodes.map((ep) => ({
          id: ep.id,
          displayId: ep.episode_number.toString(),
          title: locale === "en" ? ep.title_en || ep.title_tr : ep.title_tr,
          description:
            locale === "en"
              ? ep.description_en || ep.description_tr
              : ep.description_tr,
          content:
            locale === "en" ? ep.content_en || ep.content_tr : ep.content_tr,
          date: ep.date,
          youtubeLink: ep.youtube_url || "https://youtube.com",
          spotifyLink: ep.spotify_url || "https://spotify.com",
        }))
      : (t.episodes || []).map((ep: any) => ({
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
