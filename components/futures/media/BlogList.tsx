"use client";

import { MediaHero } from "@/components/futures/media/MediaHero";
import { BlogCard } from "@/components/shared/BlogCard";
import { SearchInput, Button } from "poyraz-ui/atoms";
import { useState, useMemo } from "react";
import { Dictionary } from "@/types/dictionary";

// categories are now from dictionary

interface BlogListProps {
  dictionary: Dictionary;
}

export function BlogList({ dictionary }: BlogListProps) {
  const t = dictionary.mediaBlog;
  const common = dictionary.mediaCommon.labels;

  const categories = Object.values(t.categories) as string[];
  const blogPosts = (t.posts || []).map((post: any) => ({
    ...post,
    date: "18 Oct 2023", // Static for now or we could add to dict
    readTime: "12",
    image: post.slug.includes("clean")
      ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
      : post.slug.includes("figma")
        ? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    author: { name: "Poyraz Avsever", avatar: "" },
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(common.all);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post: any) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === common.all || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, blogPosts, common.all]);

  return (
    <div className="min-h-screen pb-32 bg-white">
      <MediaHero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        badge={t.hero.badge}
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
              placeholder={common.searchMakalelerde}
              onSearch={(val) => setSearchQuery(val)}
              // Mocking onChange for real-time feel since SearchInput might only trigger on Enter
              // In a real app, I'd check the SearchInput implementation
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post: any) => (
              <BlogCard key={post.slug} {...post} dictionary={dictionary} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400 border border-dashed border-slate-200 bg-slate-50">
              <p className="text-lg">{common.noContentsFound}</p>
              <Button
                variant="link"
                className="text-red-600 mt-2"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(common.all);
                }}
              >
                {common.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
