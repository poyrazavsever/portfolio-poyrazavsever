/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { MediaHero } from "@/components/futures/media/MediaHero";
import { MasaBasiArchiveClient } from "./MasaBasiArchiveClient";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getPublishedEpisodes } from "@/lib/supabase/queries/media";

export default async function PastEpisodesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const t = dictionary.mediaMasaBasi;

  const supabaseEpisodes = await getPublishedEpisodes("masa_basi");

  // Supabase'den veri varsa onu kullan, yoksa dictionary fallback
  const episodes =
    supabaseEpisodes.length > 0
      ? supabaseEpisodes.map((ep) => ({
          id: ep.id,
          title: locale === "en" ? ep.title_en || ep.title_tr : ep.title_tr,
          guest: ep.guest_name || "",
          date: ep.date,
          youtubeLink: ep.youtube_url || "https://youtube.com",
          description:
            locale === "en"
              ? ep.description_en || ep.description_tr
              : ep.description_tr,
          content:
            locale === "en" ? ep.content_en || ep.content_tr : ep.content_tr,
          topics: ep.topics || [],
        }))
      : (t.archive?.episodes || []).map((ep: any) => ({
          ...ep,
          youtubeLink: "https://youtube.com",
        }));

  return (
    <div className="min-h-screen pb-32 bg-white">
      <MediaHero
        title={t.archive.hero.title}
        subtitle={t.archive.hero.subtitle}
        badge={t.archive.hero.badge}
      />

      <MasaBasiArchiveClient episodes={episodes} dictionary={dictionary} />
    </div>
  );
}
