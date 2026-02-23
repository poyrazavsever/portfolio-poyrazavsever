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

interface BlogFormProps {
  post?: AdminBlogPost;
  onCancel: () => void;
}

const categories = Object.entries(BLOG_CATEGORY_LABELS) as [
  BlogCategory,
  string,
][];

export function BlogForm({ post, onCancel }: BlogFormProps) {
  const isEditing = !!post;

  // Cover image
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [titleTr, setTitleTr] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);

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
      setTitleTr(post.title_tr);
      setSlug(post.slug);
      setSlugManual(true);
      setContentTr(post.content_tr || "");
      setContentEn(post.content_en || "");
    } else {
      setCoverPreview(null);
      setTitleTr("");
      setSlug("");
      setSlugManual(false);
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
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase entegrasyonu buraya gelecek
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Typography variant="h3">
          {isEditing ? `"${post.title_tr}" Düzenleniyor` : "Yeni Blog Yazısı"}
        </Typography>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
          <Button type="submit">{isEditing ? "Güncelle" : "Oluştur"}</Button>
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
              <Input placeholder="Post title" defaultValue={post?.title_en} />
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
              <Select defaultValue={post?.category}>
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
                defaultValue={post?.excerpt_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Özet (EN)</Label>
              <Textarea
                placeholder="Short excerpt — for cards and SEO"
                rows={3}
                defaultValue={post?.excerpt_en}
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
                defaultValue={post?.tags?.join(", ")}
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
              defaultValue={
                post?.published_at
                  ? new Date(post.published_at).toISOString().slice(0, 16)
                  : undefined
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="is_published"
              defaultChecked={post?.is_published ?? false}
            />
            <Label htmlFor="is_published">Yayınla</Label>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
