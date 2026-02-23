"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Label,
  Typography,
  Checkbox,
  Textarea,
  Card,
  CardContent,
  Separator,
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
import { AdminProject, ProjectType, PROJECT_TYPE_LABELS } from "@/types/admin";
import { generateSlug } from "@/lib/admin-utils";
import { Upload, X, Plus } from "lucide-react";

interface ProjectFormProps {
  project?: AdminProject;
  onCancel: () => void;
}

const projectTypes = Object.entries(PROJECT_TYPE_LABELS) as [
  ProjectType,
  string,
][];

export function ProjectForm({ project, onCancel }: ProjectFormProps) {
  const isEditing = !!project;
  const [type, setType] = useState<ProjectType>("portfolio");

  // Form state
  const [titleTr, setTitleTr] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);

  // Cover image
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Gallery images
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      setType(project.type);
      setTitleTr(project.title_tr);
      setSlug(project.slug);
      setSlugManual(true);
      setCoverPreview(project.cover_image || null);
      setGalleryPreviews(project.gallery_images || []);
    } else {
      setType("portfolio");
      setTitleTr("");
      setSlug("");
      setSlugManual(false);
      setCoverPreview(null);
      setGalleryPreviews([]);
    }
  }, [project]);

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
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map((f) => URL.createObjectURL(f));
      setGalleryPreviews((prev) => [...prev, ...urls]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
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
          {isEditing ? `"${project.title_tr}" Düzenleniyor` : "Yeni Proje Ekle"}
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
          <TabsTrigger value="detail">Detay</TabsTrigger>
          <TabsTrigger value="media">Görseller</TabsTrigger>
          <TabsTrigger value="links">Linkler</TabsTrigger>
          <TabsTrigger value="specific">Tipe Özel</TabsTrigger>
          <TabsTrigger value="meta">Meta</TabsTrigger>
        </TabsList>

        {/* ── Genel ── */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Başlık (TR)</Label>
              <Input
                placeholder="Proje adı"
                value={titleTr}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Başlık (EN)</Label>
              <Input
                placeholder="Project title"
                defaultValue={project?.title_en}
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
                placeholder="proje-adi"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tür</Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as ProjectType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map(([value, label]) => (
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
              <Label>Açıklama (TR)</Label>
              <Textarea
                placeholder="Kısa açıklama"
                defaultValue={project?.description_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Açıklama (EN)</Label>
              <Textarea
                placeholder="Short description"
                defaultValue={project?.description_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kategori (TR)</Label>
              <Input
                placeholder="SaaS, Mobil..."
                defaultValue={project?.category_tr}
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori (EN)</Label>
              <Input
                placeholder="SaaS, Mobile..."
                defaultValue={project?.category_en}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Yıl</Label>
              <Input placeholder="2024" defaultValue={project?.year} />
            </div>
            <div className="space-y-2">
              <Label>Etiketler (virgülle ayır)</Label>
              <Input
                placeholder="React, Next.js, TypeScript"
                defaultValue={project?.tags?.join(", ")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Özellikler / Features (her satır bir madde)</Label>
            <Textarea
              placeholder={"Özellik 1\nÖzellik 2\nÖzellik 3"}
              rows={4}
              defaultValue={project?.features?.join("\n")}
            />
          </div>
        </TabsContent>

        {/* ── Detay (i18n case study) ── */}
        <TabsContent value="detail" className="space-y-4">
          <Typography variant="muted">
            Detaylı proje açıklamaları (case study alanları). Markdown
            destekler.
          </Typography>

          {[
            { label: "Problem", keyTr: "problem_tr", keyEn: "problem_en" },
            { label: "Çözüm", keyTr: "solution_tr", keyEn: "solution_en" },
            { label: "Rol", keyTr: "role_tr", keyEn: "role_en" },
            {
              label: "Tasarım Süreci",
              keyTr: "design_process_tr",
              keyEn: "design_process_en",
            },
            {
              label: "Teknik Detaylar",
              keyTr: "technical_details_tr",
              keyEn: "technical_details_en",
            },
            {
              label: "Öğrenilen Dersler",
              keyTr: "lessons_learned_tr",
              keyEn: "lessons_learned_en",
            },
          ].map((field) => (
            <div key={field.keyTr} className="space-y-2">
              <Label>{field.label}</Label>
              <div className="grid grid-cols-2 gap-2">
                <Textarea
                  placeholder={`${field.label} (TR)`}
                  rows={3}
                  defaultValue={
                    project?.[field.keyTr as keyof AdminProject] as string
                  }
                />
                <Textarea
                  placeholder={`${field.label} (EN)`}
                  rows={3}
                  defaultValue={
                    project?.[field.keyEn as keyof AdminProject] as string
                  }
                />
              </div>
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <Label>Mermaid Diyagram</Label>
            <Typography variant="muted">
              Teknik mimari diyagramı için Mermaid söz dizimi.
            </Typography>
            <Textarea
              placeholder={"graph TD\n  A[App] --> B[API]\n  B --> C[Database]"}
              rows={6}
              className="font-mono text-sm"
              defaultValue={project?.mermaid}
            />
          </div>
        </TabsContent>

        {/* ── Görseller ── */}
        <TabsContent value="media" className="space-y-6">
          {/* Cover Image */}
          <div className="space-y-3">
            <Label>Kapak Görseli</Label>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
            />

            {coverPreview ? (
              <div className="relative w-full max-w-md aspect-video border-2 border-dashed border-slate-300">
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
                className="w-full max-w-md aspect-video border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 hover:border-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-slate-400" />
                <Typography variant="muted">
                  Görsel yüklemek için tıklayın
                </Typography>
              </button>
            )}
          </div>

          <Separator />

          {/* Gallery Images */}
          <div className="space-y-3">
            <Label>Galeri Görselleri</Label>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleGalleryUpload}
            />

            <div className="grid grid-cols-3 gap-4">
              {galleryPreviews.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-square border-2 border-dashed border-slate-300"
                >
                  <img
                    src={url}
                    alt={`Galeri ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 hover:border-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Plus className="w-6 h-6 text-slate-400" />
                <Typography variant="muted">Ekle</Typography>
              </button>
            </div>
          </div>
        </TabsContent>

        {/* ── Linkler ── */}
        <TabsContent value="links" className="space-y-4">
          <div className="space-y-2">
            <Label>Demo URL</Label>
            <Input
              placeholder="https://demo.example.com"
              defaultValue={project?.demo_url}
            />
          </div>
          <div className="space-y-2">
            <Label>Repository URL</Label>
            <Input
              placeholder="https://github.com/..."
              defaultValue={project?.repo_url}
            />
          </div>
          <div className="space-y-2">
            <Label>Case Study URL</Label>
            <Input
              placeholder="https://..."
              defaultValue={project?.case_study_url}
            />
          </div>
        </TabsContent>

        {/* ── Tipe Özel ── */}
        <TabsContent value="specific" className="space-y-4">
          <Typography variant="muted">
            Seçilen tür: <strong>{PROJECT_TYPE_LABELS[type]}</strong>
          </Typography>

          {(type === "product_saas" || type === "product_mobile") && (
            <Card variant="bordered">
              <CardContent className="p-4 space-y-4">
                <Typography variant="small">Ürün Alanları</Typography>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fiyat ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      defaultValue={project?.price}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Checkbox
                      id="is_premium"
                      defaultChecked={project?.is_premium}
                    />
                    <Label htmlFor="is_premium">Premium Ürün</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {type === "product_figma" && (
            <Card variant="bordered">
              <CardContent className="p-4 space-y-4">
                <Typography variant="small">Figma Alanları</Typography>
                <div className="space-y-2">
                  <Label>Figma URL</Label>
                  <Input
                    placeholder="https://figma.com/..."
                    defaultValue={project?.figma_url}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ekran Sayısı</Label>
                    <Input
                      type="number"
                      defaultValue={project?.screens_count}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bileşen Sayısı</Label>
                    <Input
                      type="number"
                      defaultValue={project?.components_count}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fiyat ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      defaultValue={project?.price}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Checkbox
                      id="is_premium_figma"
                      defaultChecked={project?.is_premium}
                    />
                    <Label htmlFor="is_premium_figma">Premium</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(type === "portfolio" ||
            type === "fullstack_case" ||
            type === "design_case") && (
            <Card variant="bordered">
              <CardContent className="p-4">
                <Typography variant="muted">
                  Bu tür için ekstra alan bulunmuyor. Detay sekmesindeki case
                  study alanlarını kullanabilirsin.
                </Typography>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ── Meta ── */}
        <TabsContent value="meta" className="space-y-4">
          <div className="space-y-2">
            <Label>Sıralama</Label>
            <Input type="number" defaultValue={project?.sort_order ?? 0} />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_published"
                defaultChecked={project?.is_published ?? true}
              />
              <Label htmlFor="is_published">Yayınla</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="featured" defaultChecked={project?.featured} />
              <Label htmlFor="featured">Öne Çıkar</Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
