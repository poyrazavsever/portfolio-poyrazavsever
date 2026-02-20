import { cookies } from "next/headers";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommentSection } from "@/components/futures/media/CommentSection";
import { LikeButton } from "@/components/futures/media/LikeButton";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Typography,
} from "poyraz-ui/atoms";
import { Calendar, Clock, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

// blogData is now loaded from dictionary

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params for Next.js 15+
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);
  const t = dictionary.mediaBlog;
  const common = dictionary.mediaCommon.labels;

  const post = t.posts.find((p: any) => p.slug === slug);

  // Default to logic or safe fallback
  const safePost = post || t.posts[0];

  // Add image/meta manually since it's missing in json but present in mock
  const meta = {
    image:
      "https://images.unsplash.com/photo-1618477247222-ac5913054c26?q=80&w=2070&auto=format&fit=crop",
    readTime: "8 dk",
    date: "25 Oct 2023",
  };

  return (
    <div className="min-h-screen pb-32 bg-white">
      {/* Top Nav / Back */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="text-slate-500 hover:text-slate-900 -ml-4 gap-2"
          asChild
        >
          <Link href="/media/blog">
            <ArrowLeft className="w-4 h-4" />
            {common.backToBlog}
          </Link>
        </Button>
      </div>

      <article className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
            <Badge
              variant="outline"
              className="border-red-200 text-red-600 bg-red-50"
            >
              {safePost.category}
            </Badge>
            <div className="flex items-center gap-2 text-sm font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {meta.date}
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {meta.readTime}
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight">
            {safePost.title}
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-dashed border-slate-200 py-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                <AvatarFallback className="bg-slate-900 text-white font-bold">
                  PA
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-bold text-slate-900 leading-none mb-1">
                  Poyraz Avsever
                </p>
                <p className="text-sm text-slate-500">Software Architect</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LikeButton initialCount={42} />
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-slate-900"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-16 rounded-xl overflow-hidden border border-dashed border-slate-200 bg-slate-50 p-2">
          <div className="relative aspect-21/9 overflow-hidden rounded-lg">
            <img
              src={meta.image}
              alt={safePost.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content - Custom Markdown Rendering */}
        <div className="mb-20">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <div className="mb-6 pt-4">
                  <Typography variant="h2">{children}</Typography>
                  <div className="h-1 w-24 bg-red-600 mt-4" />
                </div>
              ),
              h2: ({ children }) => (
                <Typography
                  variant="h3"
                  className="mt-12 mb-6 border-l-4 border-red-600 pl-6 py-2 bg-slate-50"
                >
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography
                  variant="h4"
                  className="mt-8 mb-4 font-bold text-slate-900"
                >
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-600 text-lg">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-600 text-lg">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="pl-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-dashed border-red-300 bg-red-50/30 p-6 italic text-slate-700 mb-8 text-xl font-medium">
                  {children}
                </blockquote>
              ),
              code(props) {
                const { children, className } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <div className="mb-8 rounded-lg overflow-hidden border border-slate-800 shadow-xl">
                    {/* Optional Header for mac-style window controls or language label */}
                    <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-xs font-mono text-slate-500 uppercase">
                        {match[1]}
                      </span>
                    </div>
                    <SyntaxHighlighter
                      PreTag="div"
                      language={match[1]}
                      style={dracula}
                      customStyle={{
                        margin: 0,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        padding: "1.5rem",
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-red-600 border border-slate-200 rounded-md">
                    {children}
                  </code>
                );
              },
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-red-600 hover:text-red-700 underline decoration-dashed underline-offset-4 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {safePost.content}
          </ReactMarkdown>
        </div>

        {/* Interaction Footer */}
        <div className="flex justify-center mb-16">
          <div className="text-center">
            <p className="text-slate-400 mb-4 font-mono text-sm">
              {common.didYouLikePost}
            </p>
            <LikeButton initialCount={42} />
          </div>
        </div>

        <CommentSection dictionary={dictionary} />
      </article>
    </div>
  );
}
