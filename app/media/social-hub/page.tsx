import { MediaHero } from "@/components/futures/media/MediaHero";
import { InstagramCard } from "@/components/futures/media/InstagramCard";
import { YoutubeCard } from "@/components/futures/media/YoutubeCard";
import { Button, PatternGrid, Typography } from "poyraz-ui/atoms";
import { Instagram, Youtube, ArrowRight } from "lucide-react";

// Mock Data
const instagramPosts = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop",
    caption:
      "Yazılım dünyasında yeni başlayanlar için 5 altın tavsiye! 🚀 #yazılım #kariyer",
    likes: 1240,
    comments: 45,
    videoUrl: "#",
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2089&auto=format&fit=crop",
    caption:
      "Kod yazarken müzik dinliyor musunuz? İşte favori playlistim! 🎧 #coding #music",
    likes: 890,
    comments: 32,
    videoUrl: "#",
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
    caption:
      "React 19 ile gelen yeniliklere göz atıyoruz. Heyecanlı mısınız? 🔥 #reactjs #frontend",
    likes: 2100,
    comments: 120,
    videoUrl: "#",
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    caption: "Bugünün ofis manzarası. Kahve ve kod! ☕💻 #developerlife #setup",
    likes: 1500,
    comments: 60,
  },
];

const youtubeVideos = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    title: "Sıfırdan İleri Seviye Next.js Eğitimi - Bölüm 1",
    views: "15B",
    duration: "45:20",
    publishedAt: "2 gün önce",
    videoUrl: "https://youtube.com",
    category: "Tutorial",
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
    title: "Yazılımcı Olmak İçin Hangi Yolu İzlemelisin? Kariyer Rehberi",
    views: "8.2B",
    duration: "22:15",
    publishedAt: "1 hafta önce",
    videoUrl: "https://youtube.com",
    category: "Kariyer",
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop",
    title: "AI Araçları ile Kodlama Hızını 10x Artır!",
    views: "25B",
    duration: "18:40",
    publishedAt: "3 hafta önce",
    videoUrl: "https://youtube.com",
    category: "Teknoloji",
  },
];

export default function SocialHubPage() {
  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Hero Section */}
      <MediaHero
        title="Social Hub"
        subtitle="Teknoloji, yazılım ve kariyer üzerine ürettiğim tüm içerikleri tek bir yerden takip edin."
        badge="Community"
      />

      {/* Instagram Section */}
      <section className="py-20 relative overflow-hidden max-w-6xl mx-auto">
        {/* Background Pattern */}
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
                  Instagram&lsquo;da Neler Oluyor?
                </Typography>
              </div>
              <p className="text-slate-600 max-w-2xl text-lg">
                Kısa ipuçları, perde arkası görüntüler ve günlük hayatımdan
                kareler.
              </p>
            </div>
            <Button variant="outline" className="gap-2 group">
              Takip Et
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramPosts.map((post) => (
              <InstagramCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Youtube Section */}
      <section className="py-20 border-t border-dashed border-slate-200 max-w-6xl mx-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#FF0000] p-2 rounded-lg text-white shadow-lg shadow-red-200">
                  <Youtube className="w-6 h-6 fill-current" />
                </div>
                <Typography variant="h3" className="font-bold text-slate-900">
                  Öne Çıkan Videolar
                </Typography>
              </div>
              <p className="text-slate-600 max-w-2xl text-lg">
                Detaylı eğitimler, teknik incelemeler ve sektör sohbetleri.
              </p>
            </div>
            <Button className="gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white group">
              Abone Ol
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youtubeVideos.map((video) => (
              <YoutubeCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
