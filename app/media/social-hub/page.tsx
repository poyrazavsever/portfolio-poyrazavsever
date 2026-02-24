/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { MediaHero } from "@/components/futures/media/MediaHero";
import { InstagramCard } from "@/components/futures/media/InstagramCard";
import { YoutubeCard } from "@/components/futures/media/YoutubeCard";
import { Button, PatternGrid, Typography } from "poyraz-ui/atoms";
import { Instagram, Youtube, ArrowRight } from "lucide-react";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getPublishedSocialVideos } from "@/lib/supabase/queries/media";

export default async function SocialHubPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const t = dictionary.mediaSocial;
  const common = dictionary.mediaCommon.labels;

  const allVideos = await getPublishedSocialVideos();

  // Supabase'den veri varsa onu kullan, yoksa dictionary fallback
  const instagramPosts =
    allVideos.filter((v) => v.platform === "instagram").length > 0
      ? allVideos
          .filter((v) => v.platform === "instagram")
          .map((v) => ({
            id: v.id,
            caption: v.caption || "",
            thumbnail: v.thumbnail_url || "",
            videoUrl: v.video_url || "#",
            likes: v.likes_count || "0",
            comments: v.comments_count || "0",
          }))
      : (t.instagram || []).map((post: any) => ({
          ...post,
          thumbnail:
            "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop",
          videoUrl: "#",
        }));

  const youtubeVideos =
    allVideos.filter((v) => v.platform === "youtube").length > 0
      ? allVideos
          .filter((v) => v.platform === "youtube")
          .map((v) => ({
            id: v.id,
            title: v.title || "",
            thumbnail: v.thumbnail_url || "",
            videoUrl: v.video_url || "#",
            views: v.views_count || "0",
            duration: v.duration || "",
            publishedAt: v.published_at || "",
            likes: v.likes_count || "0",
            comments: v.comments_count || "0",
            category: "Video",
          }))
      : t.youtube.map((video: any) => ({
          ...video,
          thumbnail:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
          videoUrl: "https://youtube.com",
          category: "Tutorial",
          views: "15B",
          duration: "45:20",
          publishedAt: "2 days ago",
        }));

  return (
    <div className="min-h-screen bg-white pb-32">
      <MediaHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        badge={t.hero.badge}
      />

      <section className="py-20 relative overflow-hidden max-w-6xl mx-auto">
        <PatternGrid
          className="absolute inset-0 text-slate-100 -z-10"
          size={60}
        />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-2 rounded-lg text-white shadow-lg">
                  <Instagram className="w-6 h-6" />
                </div>
                <Typography variant="h3" className="font-bold text-slate-900">
                  {t.instagram_title}
                </Typography>
              </div>
              <p className="text-slate-600 max-w-2xl text-lg">
                {t.instagram_description}
              </p>
            </div>
            <Button variant="outline" className="gap-2 group">
              {common.follow}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramPosts.map((post: any) => (
              <InstagramCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-dashed border-slate-200 max-w-6xl mx-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FF0000] p-2 rounded-lg text-white shadow-lg shadow-red-200">
                  <Youtube className="w-6 h-6 fill-current" />
                </div>
                <Typography variant="h3" className="font-bold text-slate-900">
                  {t.youtube_title}
                </Typography>
              </div>
              <p className="text-slate-600 max-w-2xl text-lg">
                {t.youtube_description}
              </p>
            </div>
            <Button className="gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white group">
              {common.subscribe}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youtubeVideos.map((video: any) => (
              <YoutubeCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
