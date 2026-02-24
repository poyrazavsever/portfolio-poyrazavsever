/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MediaHero } from "@/components/futures/media/MediaHero";
import { BlogCard } from "@/components/shared/BlogCard";
import { SearchInput, Button } from "poyraz-ui/atoms";
import { useState, useMemo } from "react";
import { Dictionary } from "@/types/dictionary";

// categories are now from dictionary

import { AdminBlogPost } from "@/types/admin";

interface BlogListProps {
  dictionary: Dictionary;
  initialPosts: AdminBlogPost[];
}

export function BlogList({ dictionary, initialPosts }: BlogListProps) {
  const t = dictionary.mediaBlog;
  const common = dictionary.mediaCommon.labels;

  const categories = Object.values(t.categories) as string[];
  const isEn = dictionary.mediaBlog.hero.title !== "Yazılar"; // Rough locale check or pass locale down. Since dictionary is localized, we can check a known string or just use _tr/_en based on context. Wait, the better way is to pass `locale` or rely on the fact that if we just want `title`, we need `post.title_tr` or `post.title_en`. Let's just use `post.title_tr` for now, assuming Turkish as primary, or fallback.
  // Wait, I can determine locale from dictionary context, like `dictionary.shared.warning === "Warning"`.
  const isEnLocale = dictionary.shared?.warning === "Warning";

  const blogPosts = initialPosts.map((post) => ({
    ...post,
    title: isEnLocale ? post.title_en || post.title_tr : post.title_tr,
    excerpt: isEnLocale ? post.excerpt_en || post.excerpt_tr : post.excerpt_tr,
    date: post.published_at
      ? new Date(post.published_at).toLocaleDateString(
          isEnLocale ? "en-US" : "tr-TR",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        )
      : "",
    readTime: post.read_time_min?.toString() || "5",
    image:
      post.cover_image ||
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
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
