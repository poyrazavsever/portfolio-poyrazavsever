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
import { createProject, updateProject } from "@/lib/supabase/queries/projects";

interface ProjectFormProps {
  project?: AdminProject;
  onCancel: (shouldRefresh?: boolean) => void;
}

const projectTypes = Object.entries(PROJECT_TYPE_LABELS) as [
  ProjectType,
  string,
][];

export function ProjectForm({ project, onCancel }: ProjectFormProps) {
  const isEditing = !!project;
  const [type, setType] = useState<ProjectType>("portfolio");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [titleTr, setTitleTr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [descriptionTr, setDescriptionTr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [categoryTr, setCategoryTr] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [year, setYear] = useState("");
  const [tags, setTags] = useState("");
  const [features, setFeatures] = useState("");
  const [problemTr, setProblemTr] = useState("");
  const [problemEn, setProblemEn] = useState("");
  const [solutionTr, setSolutionTr] = useState("");
  const [solutionEn, setSolutionEn] = useState("");
  const [roleTr, setRoleTr] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [designProcessTr, setDesignProcessTr] = useState("");
  const [designProcessEn, setDesignProcessEn] = useState("");
  const [technicalDetailsTr, setTechnicalDetailsTr] = useState("");
  const [technicalDetailsEn, setTechnicalDetailsEn] = useState("");
  const [lessonsLearnedTr, setLessonsLearnedTr] = useState("");
  const [lessonsLearnedEn, setLessonsLearnedEn] = useState("");
  const [mermaid, setMermaid] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [caseStudyUrl, setCaseStudyUrl] = useState("");
  const [price, setPrice] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [figmaUrl, setFigmaUrl] = useState("");
  const [screensCount, setScreensCount] = useState("");
  const [componentsCount, setComponentsCount] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isPublished, setIsPublished] = useState(true);
  const [featured, setFeatured] = useState(false);

  // Cover image
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Gallery images
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // File objects for uploading
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<
    { file: File; preview: string }[]
  >([]);

  useEffect(() => {
    if (project) {
      setType(project.type);
      setTitleTr(project.title_tr || "");
      setTitleEn(project.title_en || "");
      setSlug(project.slug || "");
      setSlugManual(true);
      setDescriptionTr(project.description_tr || "");
      setDescriptionEn(project.description_en || "");
      setCategoryTr(project.category_tr || "");
      setCategoryEn(project.category_en || "");
      setYear(project.year || "");
      setTags(project.tags?.join(", ") || "");
      setFeatures(project.features?.join("\n") || "");
      setProblemTr(project.problem_tr || "");
      setProblemEn(project.problem_en || "");
      setSolutionTr(project.solution_tr || "");
      setSolutionEn(project.solution_en || "");
      setRoleTr(project.role_tr || "");
      setRoleEn(project.role_en || "");
      setDesignProcessTr(project.design_process_tr || "");
      setDesignProcessEn(project.design_process_en || "");
      setTechnicalDetailsTr(project.technical_details_tr || "");
      setTechnicalDetailsEn(project.technical_details_en || "");
      setLessonsLearnedTr(project.lessons_learned_tr || "");
      setLessonsLearnedEn(project.lessons_learned_en || "");
      setMermaid(project.mermaid || "");
      setDemoUrl(project.demo_url || "");
      setRepoUrl(project.repo_url || "");
      setCaseStudyUrl(project.case_study_url || "");
      setPrice(project.price?.toString() || "");
      setIsPremium(project.is_premium || false);
      setFigmaUrl(project.figma_url || "");
      setScreensCount(project.screens_count?.toString() || "");
      setComponentsCount(project.components_count?.toString() || "");
      setSortOrder(project.sort_order?.toString() || "0");
      setIsPublished(project.is_published ?? true);
      setFeatured(project.featured || false);
      setCoverPreview(project.cover_image || null);
      setCoverFile(null);
      setGalleryPreviews(project.gallery_images || []);
      setGalleryFiles([]);
    } else {
      setType("portfolio");
      setTitleTr("");
      setTitleEn("");
      setSlug("");
      setSlugManual(false);
      setDescriptionTr("");
      setDescriptionEn("");
      setCategoryTr("");
      setCategoryEn("");
      setYear("");
      setTags("");
      setFeatures("");
      setProblemTr("");
      setProblemEn("");
      setSolutionTr("");
      setSolutionEn("");
      setRoleTr("");
      setRoleEn("");
      setDesignProcessTr("");
      setDesignProcessEn("");
      setTechnicalDetailsTr("");
      setTechnicalDetailsEn("");
      setLessonsLearnedTr("");
      setLessonsLearnedEn("");
      setMermaid("");
      setDemoUrl("");
      setRepoUrl("");
      setCaseStudyUrl("");
      setPrice("");
      setIsPremium(false);
      setFigmaUrl("");
      setScreensCount("");
      setComponentsCount("");
      setSortOrder("0");
      setIsPublished(true);
      setFeatured(false);
      setCoverPreview(null);
      setCoverFile(null);
      setGalleryPreviews([]);
      setGalleryFiles([]);
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
      setCoverFile(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setGalleryFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeCoverImage = () => {
    setCoverPreview(null);
    setCoverFile(null);
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  const removeGalleryImageOld = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeGalleryImageNew = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { uploadProjectImage } =
        await import("@/lib/supabase/queries/projects");

      let finalCoverUrl = coverPreview;
      if (coverFile) {
        const fileExt = coverFile.name.split(".").pop();
        const fileName = `covers/${Date.now()}-${slug}.${fileExt}`;
        finalCoverUrl = await uploadProjectImage(coverFile, fileName);
      }

      const finalGalleryUrls = [...galleryPreviews];
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i].file;
        const fileExt = file.name.split(".").pop();
        const fileName = `gallery/${Date.now()}-${slug}-${i}.${fileExt}`;
        const url = await uploadProjectImage(file, fileName);
        finalGalleryUrls.push(url);
      }

      const projectData: Partial<AdminProject> = {
        title_tr: titleTr,
        title_en: titleEn,
        slug: slug || generateSlug(titleTr),
        type,
        description_tr: descriptionTr,
        description_en: descriptionEn,
        category_tr: categoryTr,
        category_en: categoryEn,
        year,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        features: features
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        problem_tr: problemTr,
        problem_en: problemEn,
        solution_tr: solutionTr,
        solution_en: solutionEn,
        role_tr: roleTr,
        role_en: roleEn,
        design_process_tr: designProcessTr,
        design_process_en: designProcessEn,
        technical_details_tr: technicalDetailsTr,
        technical_details_en: technicalDetailsEn,
        lessons_learned_tr: lessonsLearnedTr,
        lessons_learned_en: lessonsLearnedEn,
        mermaid,
        demo_url: demoUrl,
        repo_url: repoUrl,
        case_study_url: caseStudyUrl,
        is_premium: isPremium,
        price: price ? parseFloat(price) : undefined,
        figma_url: figmaUrl,
        screens_count: screensCount ? parseInt(screensCount) : undefined,
        components_count: componentsCount
          ? parseInt(componentsCount)
          : undefined,
        sort_order: parseInt(sortOrder) || 0,
        is_published: isPublished,
        featured,
        cover_image: finalCoverUrl || undefined,
        gallery_images: finalGalleryUrls.length > 0 ? finalGalleryUrls : [],
      };

      if (isEditing && project?.id) {
        await updateProject(project.id, projectData);
      } else {
        await createProject({ ...projectData });
      }

      onCancel(true); // close form and refresh table
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Proje kaydedilirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Typography variant="h3">
          {isEditing ? `"${project.title_tr}" Düzenleniyor` : "Yeni Proje Ekle"}
        </Typography>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => onCancel()}>
            İptal
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            {isEditing ? "Güncelle" : "Oluştur"}
          </Button>
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
        <TabsContent value="general" className="space-y-4 force-mount">
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
                value={descriptionTr}
                onChange={(e) => setDescriptionTr(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Açıklama (EN)</Label>
              <Textarea
                placeholder="Short description"
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kategori (TR)</Label>
              <Input
                placeholder="SaaS, Mobil..."
                value={categoryTr}
                onChange={(e) => setCategoryTr(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori (EN)</Label>
              <Input
                placeholder="SaaS, Mobile..."
                value={categoryEn}
                onChange={(e) => setCategoryEn(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Yıl</Label>
              <Input
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Etiketler (virgülle ayır)</Label>
              <Input
                placeholder="React, Next.js, TypeScript"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Özellikler / Features (her satır bir madde)</Label>
            <Textarea
              placeholder={"Özellik 1\nÖzellik 2\nÖzellik 3"}
              rows={4}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>
        </TabsContent>

        {/* ── Detay (i18n case study) ── */}
        <TabsContent value="detail" className="space-y-4">
          <Typography variant="muted">
            Detaylı proje açıklamaları (case study alanları). Markdown
            destekler.
          </Typography>

          <div className="space-y-2">
            <Label>Problem</Label>
            <div className="grid grid-cols-2 gap-2">
              <Textarea
                placeholder="Problem (TR)"
                rows={3}
                value={problemTr}
                onChange={(e) => setProblemTr(e.target.value)}
              />
              <Textarea
                placeholder="Problem (EN)"
                rows={3}
                value={problemEn}
                onChange={(e) => setProblemEn(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Çözüm</Label>
            <div className="grid grid-cols-2 gap-2">
              <Textarea
                placeholder="Çözüm (TR)"
                rows={3}
                value={solutionTr}
                onChange={(e) => setSolutionTr(e.target.value)}
              />
              <Textarea
                placeholder="Çözüm (EN)"
                rows={3}
                value={solutionEn}
                onChange={(e) => setSolutionEn(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rol</Label>
            <div className="grid grid-cols-2 gap-2">
              <Textarea
                placeholder="Rol (TR)"
                rows={3}
                value={roleTr}
                onChange={(e) => setRoleTr(e.target.value)}
              />
              <Textarea
                placeholder="Rol (EN)"
                rows={3}
                value={roleEn}
                onChange={(e) => setRoleEn(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tasarım Süreci</Label>
            <div className="grid grid-cols-2 gap-2">
              <Textarea
                placeholder="Tasarım Süreci (TR)"
                rows={3}
                value={designProcessTr}
                onChange={(e) => setDesignProcessTr(e.target.value)}
              />
              <Textarea
                placeholder="Tasarım Süreci (EN)"
                rows={3}
                value={designProcessEn}
                onChange={(e) => setDesignProcessEn(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Teknik Detaylar</Label>
            <div className="grid grid-cols-2 gap-2">
              <Textarea
                placeholder="Teknik Detaylar (TR)"
                rows={3}
                value={technicalDetailsTr}
                onChange={(e) => setTechnicalDetailsTr(e.target.value)}
              />
              <Textarea
                placeholder="Teknik Detaylar (EN)"
                rows={3}
                value={technicalDetailsEn}
                onChange={(e) => setTechnicalDetailsEn(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Öğrenilen Dersler</Label>
            <div className="grid grid-cols-2 gap-2">
              <Textarea
                placeholder="Öğrenilen Dersler (TR)"
                rows={3}
                value={lessonsLearnedTr}
                onChange={(e) => setLessonsLearnedTr(e.target.value)}
              />
              <Textarea
                placeholder="Öğrenilen Dersler (EN)"
                rows={3}
                value={lessonsLearnedEn}
                onChange={(e) => setLessonsLearnedEn(e.target.value)}
              />
            </div>
          </div>

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
              value={mermaid}
              onChange={(e) => setMermaid(e.target.value)}
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
                  onClick={removeCoverImage}
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
              {/* Existing/Uploaded Gallery Previews (Strings) */}
              {galleryPreviews.map((url, i) => (
                <div
                  key={`old-${i}`}
                  className="relative aspect-square border-2 border-dashed border-slate-300"
                >
                  <img
                    src={url}
                    alt={`Galeri Mevcut ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImageOld(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* Newly Added Gallery Previews (Files) */}
              {galleryFiles.map((fileObj, i) => (
                <div
                  key={`new-${i}`}
                  className="relative aspect-square border-2 border-dashed border-slate-300"
                >
                  <img
                    src={fileObj.preview}
                    alt={`Galeri Yeni ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImageNew(i)}
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
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Repository URL</Label>
            <Input
              placeholder="https://github.com/..."
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Case Study URL</Label>
            <Input
              placeholder="https://..."
              value={caseStudyUrl}
              onChange={(e) => setCaseStudyUrl(e.target.value)}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Checkbox
                      id="is_premium"
                      checked={isPremium}
                      onCheckedChange={(checked) => setIsPremium(!!checked)}
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
                    value={figmaUrl}
                    onChange={(e) => setFigmaUrl(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ekran Sayısı</Label>
                    <Input
                      type="number"
                      value={screensCount}
                      onChange={(e) => setScreensCount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bileşen Sayısı</Label>
                    <Input
                      type="number"
                      value={componentsCount}
                      onChange={(e) => setComponentsCount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fiyat ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Checkbox
                      id="is_premium_figma"
                      checked={isPremium}
                      onCheckedChange={(checked) => setIsPremium(!!checked)}
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
            <Input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_published"
                checked={isPublished}
                onCheckedChange={(checked) => setIsPublished(!!checked)}
              />
              <Label htmlFor="is_published">Yayınla</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="featured"
                checked={featured}
                onCheckedChange={(checked) => setFeatured(!!checked)}
              />
              <Label htmlFor="featured">Öne Çıkar</Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
