"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
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
import { AdminTestimonial } from "@/types/admin";
import {
  createTestimonial,
  updateTestimonial,
} from "@/lib/supabase/queries/testimonials";

interface TestimonialFormProps {
  testimonial?: AdminTestimonial;
  onCancel: (shouldRefresh?: boolean) => void;
}

export function TestimonialForm({
  testimonial,
  onCancel,
}: TestimonialFormProps) {
  const isEditing = !!testimonial;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [contentTr, setContentTr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (testimonial) {
      setFullName(testimonial.full_name || "");
      setTitle(testimonial.title || "");
      setContentTr(testimonial.content_tr || "");
      setContentEn(testimonial.content_en || "");
      setAvatarUrl(testimonial.avatar_url || "");
      setCompanyLogoUrl(testimonial.company_logo_url || "");
      setOrderIndex(testimonial.order_index || 0);
      setIsPublished(testimonial.is_published ?? true);
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data: Partial<AdminTestimonial> = {
        full_name: fullName,
        title: title,
        content_tr: contentTr,
        content_en: contentEn,
        avatar_url: avatarUrl || undefined,
        company_logo_url: companyLogoUrl || undefined,
        order_index: orderIndex,
        is_published: isPublished,
      };

      if (isEditing && testimonial?.id) {
        await updateTestimonial(testimonial.id, data);
      } else {
        await createTestimonial(data);
      }
      onCancel(true);
    } catch (error) {
      console.error("Referans kaydetme hatası:", error);
      alert("Bir hata oluştu. Konsolu kontrol edin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Typography variant="h3">
          {isEditing
            ? `"${testimonial.full_name}" Düzenleniyor`
            : "Yeni Referans Ekle"}
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

      <Card variant="bordered">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tam İsim</Label>
              <Input
                placeholder="Örn: Ahmet Yılmaz"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Ünvan / Şirket</Label>
              <Input
                placeholder="Örn: CEO @ TechCorp"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Avatar URL</Label>
              <Input
                placeholder="https://..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Şirket Logo URL</Label>
              <Input
                placeholder="https://..."
                value={companyLogoUrl}
                onChange={(e) => setCompanyLogoUrl(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Referans (Türkçe)</Label>
            <Textarea
              placeholder="Türkçe içerik..."
              rows={4}
              value={contentTr}
              onChange={(e) => setContentTr(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Referans (İngilizce)</Label>
            <Textarea
              placeholder="English content..."
              rows={4}
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              required
            />
          </div>

          <Separator />

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Label>Sıralama:</Label>
              <Input
                type="number"
                className="w-20"
                value={orderIndex}
                onChange={(e) => setOrderIndex(parseInt(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="is_published"
                checked={isPublished}
                onCheckedChange={(checked) =>
                  setIsPublished(checked as boolean)
                }
              />
              <Label htmlFor="is_published">Yayında / Görünür</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
