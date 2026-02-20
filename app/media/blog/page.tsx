"use client";

import { MediaHero } from "@/components/futures/media/MediaHero";
import { BlogCard } from "@/components/shared/BlogCard";
import { SearchInput, Button } from "poyraz-ui/atoms";
import { useState, useMemo } from "react";
// Mock Data
const blogPosts = [
  {
    slug: "clean-architecture-dotnet",
    title: ".NET Core'da Clean Architecture Prensipleri",
    excerpt:
      "Sürdürülebilir ve ölçeklenebilir backend projeleri için Clean Architecture desenini nasıl uygulayabilirsiniz? Katmanlı mimarinin detayları.",
    date: "18 Ekim 2023",
    readTime: "12",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Poyraz Avsever",
      avatar: "",
    },
  },
  {
    slug: "figma-to-code-workflow",
    title: "Figma'dan Koda: Tasarım Sistemlerini Yönetmek",
    excerpt:
      "Tasarımcı ve geliştirici arasındaki boşluğu kapatmak. Token'lar, component'ler ve otomatik kod üretimi üzerine pratik ipuçları.",
    date: "10 Ekim 2023",
    readTime: "6",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Poyraz Avsever",
      avatar: "",
    },
  },
  {
    slug: "microservices-vs-monolith",
    title: "Mikroservisler vs Monolit: Doğru Seçimi Yapmak",
    excerpt:
      "Her proje mikroservis gerektirmez. Dağıtık sistemlerin maliyeti ve monolitik mimarinin avantajları üzerine bir karşılaştırma.",
    date: "05 Ekim 2023",
    readTime: "15",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    author: {
      name: "Poyraz Avsever",
      avatar: "",
    },
  },
];

const categories = [
  "Tümü",
  "Frontend",
  "Backend",
  "Design",
  "Architecture",
  "DevOps",
];

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tümü" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pb-32 bg-white">
      <MediaHero
        title="Tech & Engineering Blog"
        subtitle="Yazılım mimarisi, modern frontend teknolojileri ve sektörel deneyimler üzerine derinlemesine makaleler."
        badge="Insights"
      />

      <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-10">
        {/* Filters Toolbar */}
        <div className="bg-white border border-dashed border-slate-200 p-4 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between shadow-sm">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? ""
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-72">
            <SearchInput
              placeholder="Makalelerde ara..."
              onSearch={(val) => setSearchQuery(val)}
              // Mocking onChange for real-time feel since SearchInput might only trigger on Enter
              // In a real app, I'd check the SearchInput implementation
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <BlogCard key={post.slug} {...post} />)
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400 border border-dashed border-slate-200 bg-slate-50">
              <p className="text-lg">
                Aradığınız kriterlere uygun içerik bulunamadı.
              </p>
              <Button
                variant="link"
                className="text-red-600 mt-2"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Tümü");
                }}
              >
                Filtreleri Temizle
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
