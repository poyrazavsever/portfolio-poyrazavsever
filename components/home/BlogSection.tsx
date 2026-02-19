import { Button, Typography, Card } from "poyraz-ui/atoms";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { HorizontalScroll } from "@/components/shared/HorizontalScroll";

const posts = [
  {
    title: "0'dan React Dersleri - React 101",
    keyword: "React",
    description:
      "A comprehensive journey through the modern web stack. Learn React, State Management, Hooks...",
    readTime: 4,
    likes: 142,
    comments: 12,
    image: "https://img.youtube.com/vi/b3SL2S1zYwU/maxresdefault.jpg",
    href: "/blog/react-101",
  },
  {
    title: "Next.js ile SSR ve ISR Rehberi",
    keyword: "Next.js",
    description:
      "Server-side rendering ve incremental static regeneration konularını detaylıca inceliyoruz...",
    readTime: 6,
    likes: 98,
    comments: 8,
    image: "https://img.youtube.com/vi/W1b6K7C86HY/maxresdefault.jpg",
    href: "/blog/nextjs-ssr-isr",
  },
  {
    title: "Node.js ile REST API Geliştirme",
    keyword: "Node.js",
    description:
      "Express.js kullanarak production-ready REST API nasıl geliştirilir, adım adım anlatıyoruz...",
    readTime: 5,
    likes: 167,
    comments: 15,
    image: "https://img.youtube.com/vi/N17_NNAHgzk/maxresdefault.jpg",
    href: "/blog/nodejs-rest-api",
  },
  {
    title: "TypeScript Advanced Patterns",
    keyword: "TypeScript",
    description:
      "Generics, utility types ve conditional types ile ileri seviye TypeScript kullanımı...",
    readTime: 7,
    likes: 203,
    comments: 19,
    image: "https://img.youtube.com/vi/H8sP8HejI7A/maxresdefault.jpg",
    href: "/blog/typescript-advanced",
  },
];

function BlogCard({ post }: { post: (typeof posts)[number] }) {
  const titleParts = post.title.split(post.keyword);

  return (
    <Card
      variant="bordered"
      className="min-w-[420px] w-[480px] shrink-0 overflow-hidden p-0!"
    >
      <div className="flex flex-row h-full">
        {/* Image */}
        <div className="relative w-44 shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <Typography variant="h4" className="line-clamp-1">
            {titleParts[0]}
            <span className="text-red-600 font-secondary">{post.keyword}</span>
            {titleParts[1]}
          </Typography>
          <Typography variant="muted" className="mt-1 line-clamp-2">
            {post.description}
          </Typography>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-xs text-sky-500">
              <Icon icon="mdi:clock-outline" className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-red-400">
              <Icon icon="mdi:heart-outline" className="h-3.5 w-3.5" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-sky-400">
              <Icon icon="mdi:comment-outline" className="h-3.5 w-3.5" />
              <span>{post.comments}</span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto pt-3 border-t border-dashed border-slate-200">
            <Button className="w-full" size="sm" asChild>
              <a href={post.href}>Read</a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function BlogSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header — left aligned */}
        <div className="text-left mb-10">
          <Typography variant="h2">
            Here is My <br className="hidden sm:block" />
            <span className="text-red-600 font-secondary">Digital Garden</span>
          </Typography>
          <Typography variant="muted" className="mt-2">
            Learn through real-world scenarios and industry standards.
          </Typography>
          <div className="flex items-center justify-start gap-3 mt-4">
            <Button size="sm" asChild>
              <a href="/blog">See All Courses</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/products">Browse Store</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="max-w-6xl mx-auto px-4">
        <HorizontalScroll className="flex gap-5 overflow-x-auto pb-8 pt-3 px-3 -mx-3 scrollbar-none">
          {posts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
}
