import { Button, Typography } from "poyraz-ui/atoms";
import { HorizontalScroll } from "@/components/shared/HorizontalScroll";
import { BlogCard } from "@/components/shared/BlogCard";
import Link from "next/link";

const posts = [
  {
    title: "0'dan React Dersleri",
    category: "React",
    excerpt:
      "A comprehensive journey through the modern web stack. Learn React, State Management, Hooks...",
    readTime: 4,
    image: "https://img.youtube.com/vi/b3SL2S1zYwU/maxresdefault.jpg",
    slug: "react-101",
  },
  {
    title: "Next.js ile SSR ve ISR Rehberi",
    category: "Next.js",
    excerpt:
      "Server-side rendering ve incremental static regeneration konularını detaylıca inceliyoruz...",
    readTime: 6,
    image: "https://img.youtube.com/vi/W1b6K7C86HY/maxresdefault.jpg",
    slug: "nextjs-ssr-isr",
  },
  {
    title: "Node.js ile REST API Geliştirme",
    category: "Node.js",
    excerpt:
      "Express.js kullanarak production-ready REST API nasıl geliştirilir, adım adım anlatıyoruz...",
    readTime: 5,
    image: "https://img.youtube.com/vi/N17_NNAHgzk/maxresdefault.jpg",
    slug: "nodejs-rest-api",
  },
  {
    title: "TypeScript Advanced Patterns",
    category: "TypeScript",
    excerpt:
      "Generics, utility types ve conditional types ile ileri seviye TypeScript kullanımı...",
    readTime: 7,
    image: "https://img.youtube.com/vi/H8sP8HejI7A/maxresdefault.jpg",
    slug: "typescript-advanced",
  },
];

import { Dictionary } from "@/types/dictionary";

// ... (imports)

// ... (posts array)

interface BlogSectionProps {
  dictionary: Dictionary;
}

export function BlogSection({ dictionary }: BlogSectionProps) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header — left aligned */}
        <div className="text-left mb-10">
          <Typography variant="h2">
            {dictionary.home.blog.title} <br className="hidden sm:block" />
            <span className="text-red-600 font-secondary">
              {dictionary.home.blog.highlight}
            </span>
          </Typography>
          <Typography variant="muted" className="mt-2">
            {dictionary.home.blog.subtitle}
          </Typography>
          <div className="flex items-center justify-start gap-3 mt-4">
            <Button size="sm" asChild>
              <Link href="/media/blog">
                {dictionary.home.blog.buttons.seeAll}
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/products">
                {dictionary.home.blog.buttons.browse}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="max-w-6xl mx-auto px-4">
        <HorizontalScroll className="flex gap-5 overflow-x-auto pb-8 pt-3 px-3 -mx-3 scrollbar-none">
          {posts.map((post) => {
            const translatedPost =
              dictionary.home.blog.posts[
                post.slug as keyof typeof dictionary.home.blog.posts
              ];
            return (
              <div key={post.slug} className="min-w-[320px] w-[380px] shrink-0">
                <BlogCard
                  {...post}
                  title={translatedPost?.title || post.title}
                  category={translatedPost?.category || post.category}
                  excerpt={translatedPost?.excerpt || post.excerpt}
                  dictionary={dictionary}
                />
              </div>
            );
          })}
        </HorizontalScroll>
      </div>
    </section>
  );
}
