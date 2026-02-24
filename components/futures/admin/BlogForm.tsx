"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Label,
  Typography,
  Textarea,
  Checkbox,
  Separator,
  Card,
  CardContent,
} from "poyraz-ui/atoms";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "poyraz-ui/molecules";
import {
  AdminBlogPost,
  BlogCategory,
  BLOG_CATEGORY_LABELS,
} from "@/types/admin";
import { generateSlug, estimateReadTime } from "@/lib/admin-utils";
import { Upload, X, Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  createBlogPost,
  updateBlogPost,
  uploadBlogImage,
} from "@/lib/supabase/queries/blog";

interface BlogFormProps {
  post?: AdminBlogPost;
  onCancel: (shouldRefresh?: boolean) => void;
}

const categories = Object.entries(BLOG_CATEGORY_LABELS) as [
  BlogCategory,
  string,
][];

export function BlogForm({ post, onCancel }: BlogFormProps) {
  const isEditing = !!post;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cover image
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Form state
  // General state
  const [titleTr, setTitleTr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [category, setCategory] = useState<BlogCategory | "">("");
  const [excerptTr, setExcerptTr] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [tags, setTags] = useState("");

  // Status state
  const [isPublished, setIsPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState<string>("");

  // Markdown content
  const [contentTr, setContentTr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [previewLang, setPreviewLang] = useState<"tr" | "en">("tr");
  const [showPreview, setShowPreview] = useState(false);

  // Auto read time
  const readTime = estimateReadTime(contentTr || contentEn);

  useEffect(() => {
    if (post) {
      setCoverPreview(post.cover_image || null);
      setCoverFile(null);
      setTitleTr(post.title_tr || "");
      setTitleEn(post.title_en || "");
      setSlug(post.slug || "");
      setSlugManual(true);
      setCategory(post.category || "");
      setExcerptTr(post.excerpt_tr || "");
      setExcerptEn(post.excerpt_en || "");
      setTags(post.tags?.join(", ") || "");
      setIsPublished(post.is_published ?? false);
      setPublishedAt(
        post.published_at
          ? new Date(post.published_at).toISOString().slice(0, 16)
          : "",
      );
      setContentTr(post.content_tr || "");
      setContentEn(post.content_en || "");
    } else {
      setCoverPreview(null);
      setCoverFile(null);
      setTitleTr("");
      setTitleEn("");
      setSlug("");
      setSlugManual(false);
      setCategory("");
      setExcerptTr("");
      setExcerptEn("");
      setTags("");
      setIsPublished(false);
      setPublishedAt("");
      setContentTr("");
      setContentEn("");
    }
  }, [post]);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitleTr(value);
    if (!slugManual) {
      setSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    setSlugManual(true);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      setCoverFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalCoverUrl = coverPreview;
      if (coverFile) {
        const fileExt = coverFile.name.split(".").pop();
        const fileName = `${Date.now()}-${slug}.${fileExt}`;
        finalCoverUrl = await uploadBlogImage(coverFile, fileName);
      }

      const postData: Partial<AdminBlogPost> = {
        title_tr: titleTr,
        title_en: titleEn,
        slug: slug,
        category: category as BlogCategory,
        excerpt_tr: excerptTr,
        excerpt_en: excerptEn,
        content_tr: contentTr,
        content_en: contentEn,
        cover_image: finalCoverUrl || undefined,
        read_time_min: readTime,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0),
        is_published: isPublished,
        published_at: publishedAt
          ? new Date(publishedAt).toISOString()
          : undefined,
      };

      if (isEditing && post?.id) {
        await updateBlogPost(post.id, postData);
      } else {
        await createBlogPost(
          postData as Omit<AdminBlogPost, "id" | "created_at" | "updated_at">,
        );
      }

      onCancel(true);
    } catch (error) {
      console.error("Detay kaydetme hatası:", error);
      alert("Bir hata oluştu. Konsolu kontrol edin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Typography variant="h3">
          {isEditing ? `"${post.title_tr}" Düzenleniyor` : "Yeni Blog Yazısı"}
        </Typography>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => onCancel()}>
            İptal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Kaydediliyor..."
              : isEditing
                ? "Güncelle"
                : "Oluştur"}
          </Button>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="content">İçerik</TabsTrigger>
          <TabsTrigger value="media">Görsel</TabsTrigger>
          <TabsTrigger value="meta">Meta</TabsTrigger>
        </TabsList>

        {/* ── Genel ── */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Başlık (TR)</Label>
              <Input
                placeholder="Yazı başlığı"
                value={titleTr}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Başlık (EN)</Label>
              <Input
                placeholder="Post title"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Slug
                {!slugManual && (
                  <span className="text-xs text-slate-400 ml-2">
                    (otomatik)
                  </span>
                )}
              </Label>
              <Input
                placeholder="blog-yazisi-adi"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select
                value={category}
                onValueChange={(val) => setCategory(val as BlogCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seç" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Özet (TR)</Label>
              <Textarea
                placeholder="Kısa özet — kart ve SEO için"
                rows={3}
                value={excerptTr}
                onChange={(e) => setExcerptTr(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Özet (EN)</Label>
              <Textarea
                placeholder="Short excerpt — for cards and SEO"
                rows={3}
                value={excerptEn}
                onChange={(e) => setExcerptEn(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Okuma Süresi
                <span className="text-xs text-slate-400 ml-2">
                  (otomatik: {readTime} dk)
                </span>
              </Label>
              <Input
                type="number"
                placeholder="8"
                value={readTime}
                readOnly
                className="bg-slate-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Etiketler (virgülle ayır)</Label>
              <Input
                placeholder="React, TypeScript, Next.js"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
        </TabsContent>

        {/* ── İçerik (Markdown) ── */}
        <TabsContent value="content" className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="muted">
              Markdown formatında yazı içeriği.
            </Typography>
            <Button
              type="button"
              variant={showPreview ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Düzenlemeye Dön" : "Önizleme"}
            </Button>
          </div>

          {showPreview ? (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={previewLang === "tr" ? "default" : "outline"}
                  onClick={() => setPreviewLang("tr")}
                >
                  Türkçe
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={previewLang === "en" ? "default" : "outline"}
                  onClick={() => setPreviewLang("en")}
                >
                  English
                </Button>
              </div>
              <Card variant="bordered">
                <CardContent className="p-6">
                  <div className="markdown-preview">
                    <ReactMarkdown>
                      {previewLang === "tr" ? contentTr : contentEn}
                    </ReactMarkdown>
                  </div>
                  {(previewLang === "tr" ? contentTr : contentEn).length ===
                    0 && (
                    <Typography variant="muted">
                      İçerik henüz girilmemiş.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>İçerik (TR) — Markdown</Label>
                <Textarea
                  placeholder={
                    "# Başlık\n\nParagraf yazısı...\n\n## Alt Başlık\n\n- Madde 1\n- Madde 2\n\n```js\nconsole.log('Merhaba');\n```"
                  }
                  rows={20}
                  className="font-mono text-sm"
                  value={contentTr}
                  onChange={(e) => setContentTr(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>İçerik (EN) — Markdown</Label>
                <Textarea
                  placeholder={
                    "# Title\n\nParagraph text...\n\n## Subtitle\n\n- Item 1\n- Item 2\n\n```js\nconsole.log('Hello');\n```"
                  }
                  rows={20}
                  className="font-mono text-sm"
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                />
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── Görsel ── */}
        <TabsContent value="media" className="space-y-4">
          <Label>Kapak Görseli</Label>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverUpload}
          />

          {coverPreview ? (
            <div className="relative w-full max-w-lg aspect-video border-2 border-dashed border-slate-300">
              <img
                src={coverPreview}
                alt="Kapak görseli"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverPreview(null);
                  setCoverFile(null);
                  if (coverInputRef.current) coverInputRef.current.value = "";
                }}
                className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="w-full max-w-lg aspect-video border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 hover:border-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Upload className="w-8 h-8 text-slate-400" />
              <Typography variant="muted">
                Görsel yüklemek için tıklayın
              </Typography>
            </button>
          )}
        </TabsContent>

        {/* ── Meta ── */}
        <TabsContent value="meta" className="space-y-4">
          <div className="space-y-2">
            <Label>Yayın Tarihi</Label>
            <Input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="is_published"
              checked={isPublished}
              onCheckedChange={(checked) => setIsPublished(checked as boolean)}
            />
            <Label htmlFor="is_published">Yayınla</Label>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
