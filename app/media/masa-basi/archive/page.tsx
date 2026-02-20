import { cookies } from "next/headers";
import { MediaHero } from "@/components/futures/media/MediaHero";
import { MasaBasiArchiveClient } from "./MasaBasiArchiveClient";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function PastEpisodesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as any;
  const dictionary = await getDictionary(locale);
  const t = dictionary.mediaMasaBasi;

  const episodes = (t.archive?.episodes || []).map((ep: any) => ({
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
