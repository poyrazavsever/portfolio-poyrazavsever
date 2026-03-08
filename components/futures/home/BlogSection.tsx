import { Button, Typography } from "poyraz-ui/atoms";
import { HorizontalScroll } from "@/components/shared/HorizontalScroll";
import { BlogCard } from "@/components/shared/BlogCard";
import Link from "next/link";
import { Dictionary } from "@/types/dictionary";
import { AdminBlogPost } from "@/types/admin";
import { Locale } from "@/i18n-config";

interface BlogSectionProps {
  dictionary: Dictionary;
  posts: AdminBlogPost[];
  locale: Locale;
}

export function BlogSection({ dictionary, posts, locale }: BlogSectionProps) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header — left aligned */}
        <div className="text-left mb-10">
          <Typography variant="h1">
            {dictionary.home.blog.title} <br className="hidden sm:block" />
            <span className="text-red-600 font-secondary">
              {dictionary.home.blog.highlight}
            </span>
          </Typography>
          <Typography variant="lead" className="mt-2 text-slate-500">
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
            const title = locale === "tr" ? post.title_tr : post.title_en;
            const excerpt =
              locale === "tr" ? post.excerpt_tr || "" : post.excerpt_en || "";
            const category = post.category || "Blog";

            return (
              <div key={post.id} className="min-w-[320px] w-[380px] shrink-0">
                <BlogCard
                  title={title}
                  category={category}
                  excerpt={excerpt}
                  slug={post.slug}
                  image={post.cover_image || "/placeholder.png"}
                  readTime={post.read_time_min || 3}
                  date={
                    post.published_at
                      ? new Date(post.published_at).toLocaleDateString(
                          locale === "tr" ? "tr-TR" : "en-US",
                          { day: "numeric", month: "short", year: "numeric" },
                        )
                      : undefined
                  }
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
