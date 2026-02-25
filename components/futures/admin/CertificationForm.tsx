"use client";

import { useState, useRef } from "react";
import {
  Button,
  Input,
  Label,
  Typography,
  Separator,
  Checkbox,
} from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { AdminCertification } from "@/types/admin";
import {
  createCertification,
  updateCertification,
  uploadCertificationImage,
} from "@/lib/supabase/queries/certifications";
import { X, Upload } from "lucide-react";

interface CertificationFormProps {
  certification?: AdminCertification;
  onCancel: (shouldRefresh?: boolean) => void;
}

export function CertificationForm({
  certification,
  onCancel,
}: CertificationFormProps) {
  const isEditing = !!certification;
  const [preview, setPreview] = useState<string | null>(
    certification?.image || null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title_tr: certification?.title_tr || "",
    title_en: certification?.title_en || "",
    organization_tr: certification?.organization_tr || "",
    organization_en: certification?.organization_en || "",
    issue_date_tr: certification?.issue_date_tr || "",
    issue_date_en: certification?.issue_date_en || "",
    credential_id: certification?.credential_id || "",
    tags: certification?.tags?.join(", ") || "",
    link: certification?.link || "",
    sort_order: certification?.sort_order?.toString() || "1",
    is_published: certification?.is_published ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalImageUrl = preview || undefined;
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-cert.${fileExt}`;
        finalImageUrl = await uploadCertificationImage(imageFile, fileName);
      }

      const payload: Omit<
        AdminCertification,
        "id" | "created_at" | "updated_at"
      > = {
        title_tr: formData.title_tr,
        title_en: formData.title_en,
        organization_tr: formData.organization_tr,
        organization_en: formData.organization_en,
        issue_date_tr: formData.issue_date_tr,
        issue_date_en: formData.issue_date_en,
        credential_id: formData.credential_id || undefined,
        link: formData.link || undefined,
        image: finalImageUrl,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        sort_order: parseInt(formData.sort_order || "1", 10),
        is_published: formData.is_published,
      };

      if (isEditing && certification?.id) {
        await updateCertification(certification.id, payload);
      } else {
        await createCertification(payload);
      }

      onCancel(true);
    } catch (error) {
      console.error("Failed to save certification:", error);
      alert("Sertifika kaydedilirken hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Typography variant="h3">
          {isEditing
            ? `"${certification.title_tr}" Düzenleniyor`
            : "Yeni Sertifika Ekle"}
        </Typography>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => onCancel()}>
            İptal
          </Button>
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            {isEditing ? "Güncelle" : "Oluştur"}
          </Button>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="basic">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">Temel Bilgiler</TabsTrigger>
          <TabsTrigger value="media">Görsel & Bağlantı</TabsTrigger>
          <TabsTrigger value="meta">Yayın Ayarları</TabsTrigger>
        </TabsList>

        {/* ── Temel Bilgiler ── */}
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sertifika Adı (TR)</Label>
              <Input
                name="title_tr"
                placeholder="React ile İleri Seviye Web Geliştirme"
                value={formData.title_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Certificate Title (EN)</Label>
              <Input
                name="title_en"
                placeholder="Advanced Web Development with React"
                value={formData.title_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kurum / Organizasyon (TR)</Label>
              <Input
                name="organization_tr"
                placeholder="BTK Akademi"
                value={formData.organization_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Organization (EN)</Label>
              <Input
                name="organization_en"
                placeholder="BTK Academy"
                value={formData.organization_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Veriliş Tarihi (TR)</Label>
              <Input
                name="issue_date_tr"
                placeholder="Ocak 2024"
                value={formData.issue_date_tr}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Issue Date (EN)</Label>
              <Input
                name="issue_date_en"
                placeholder="January 2024"
                value={formData.issue_date_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sertifika No / Credential ID</Label>
            <Input
              name="credential_id"
              placeholder="BTK-123456"
              value={formData.credential_id}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Yetenekler (virgülle ayır)</Label>
            <Input
              name="tags"
              placeholder="React, State Management, UI/UX"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
        </TabsContent>

        {/* ── Görsel & Bağlantı ── */}
        <TabsContent value="media" className="space-y-4">
          <div className="space-y-2">
            <Label>Sertifika Bağlantısı (URL)</Label>
            <Input
              name="link"
              placeholder="https://example.com/certificate/123"
              value={formData.link}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Sertifika Görseli / Rozeti</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {preview ? (
              <div className="relative w-full aspect-video border-2 border-dashed border-slate-300 overflow-hidden">
                <img
                  src={preview}
                  alt="Sertifika Önizleme"
                  className="w-full h-full object-contain bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setImageFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 hover:border-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-slate-400" />
                <Typography variant="muted">
                  Sertifika görselini veya rozetini yükle
                </Typography>
                <Typography variant="muted" className="text-xs">
                  PNG, JPG veya SVG (Önerilen: 16:9 oranında)
                </Typography>
              </button>
            )}
          </div>
        </TabsContent>

        {/* ── Meta ── */}
        <TabsContent value="meta" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sıralama</Label>
              <Input
                name="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-end pb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(c) =>
                    handleCheckboxChange("is_published", c as boolean)
                  }
                />
                <Label htmlFor="is_published">Yayınla</Label>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
