"use client";

import { useState, useMemo } from "react";
import { Badge, Button, Typography } from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import {
  AdminEpisode,
  AdminSocialVideo,
  EpisodeSeries,
  PLATFORM_LABELS,
  SOCIAL_LIMITS,
} from "@/types/admin";
import { mockEpisodes, mockSocialVideos } from "@/data/admin/mock-media";
import { EpisodeForm } from "./EpisodeForm";
import { SocialForm } from "./SocialForm";

// ── Masa Başı DataTable Columns ──

const masaBasiColumns: DataTableColumnDef<AdminEpisode>[] = [
  {
    id: "number",
    header: "#",
    accessorKey: "episode_number",
    cell: (row) => (
      <span className="font-mono text-slate-400">#{row.episode_number}</span>
    ),
  },
  {
    id: "guest",
    header: "Konuk",
    accessorKey: "guest_name",
    cell: (row) => (
      <div className="flex items-center gap-3">
        {row.guest_image ? (
          <img
            src={row.guest_image}
            alt={row.guest_name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold border border-slate-200">
            {row.guest_name?.charAt(0) || "?"}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium line-clamp-1">
            {row.guest_name || "—"}
          </span>
          <span className="text-[10px] text-slate-500 line-clamp-1">
            {row.guest_role}
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "title",
    header: "Başlık",
    accessorKey: "title_tr",
    sortable: true,
  },
  {
    id: "date",
    header: "Tarih",
    accessorKey: "date",
    cell: (row) => new Date(row.date).toLocaleDateString("tr-TR"),
    sortable: true,
  },
  {
    id: "status",
    header: "Durum",
    accessorKey: "is_published",
    cell: (row) => {
      if (row.is_upcoming) return <Badge>Yaklaşan</Badge>;
      if (row.is_published) return <Badge variant="default">Yayında</Badge>;
      return <Badge variant="outline">Taslak</Badge>;
    },
  },
];

// ── Yazılıma Dair DataTable Columns ──

const yazilimaDairColumns: DataTableColumnDef<AdminEpisode>[] = [
  {
    id: "number",
    header: "#",
    accessorKey: "episode_number",
    cell: (row) => (
      <span className="font-mono text-slate-400">#{row.episode_number}</span>
    ),
  },
  {
    id: "title",
    header: "Başlık",
    accessorKey: "title_tr",
    sortable: true,
  },
  {
    id: "date",
    header: "Tarih",
    accessorKey: "date",
    cell: (row) => new Date(row.date).toLocaleDateString("tr-TR"),
    sortable: true,
  },
  {
    id: "duration",
    header: "Süre",
    accessorKey: "duration",
  },
  {
    id: "status",
    header: "Durum",
    accessorKey: "is_published",
    cell: (row) =>
      row.is_published ? (
        <Badge variant="default">Yayında</Badge>
      ) : (
        <Badge variant="outline">Taslak</Badge>
      ),
  },
];

// ── Social Videos DataTable ──

const socialColumns: DataTableColumnDef<AdminSocialVideo>[] = [
  {
    id: "platform",
    header: "Platform",
    accessorKey: "platform",
    cell: (row) => (
      <Badge
        variant="secondary"
        className={
          row.platform === "instagram"
            ? "bg-pink-50 text-pink-700 border-pink-200"
            : "bg-red-50 text-red-700 border-red-200"
        }
      >
        {PLATFORM_LABELS[row.platform]}
      </Badge>
    ),
  },
  {
    id: "content",
    header: "İçerik",
    accessorKey: "title",
    cell: (row) => (
      <span className="line-clamp-1 max-w-xs">
        {row.title || row.caption || "—"}
      </span>
    ),
  },
  {
    id: "engagement",
    header: "Etkileşim",
    accessorKey: "likes_count",
    cell: (row) => (
      <span className="text-sm text-slate-500">
        ❤️ {row.likes_count || "—"} · 💬 {row.comments_count || "—"}
        {row.views_count && ` · 👁️ ${row.views_count}`}
      </span>
    ),
  },
  {
    id: "order",
    header: "Sıra",
    accessorKey: "sort_order",
  },
  {
    id: "status",
    header: "Durum",
    accessorKey: "is_published",
    cell: (row) =>
      row.is_published ? (
        <Badge variant="default">Aktif</Badge>
      ) : (
        <Badge variant="outline">Gizli</Badge>
      ),
  },
];

export function MediaTable() {
  const [editingEpisode, setEditingEpisode] = useState<
    AdminEpisode | undefined
  >();
  const [editingSocial, setEditingSocial] = useState<
    AdminSocialVideo | undefined
  >();
  const [activeTab, setActiveTab] = useState("masa_basi");
  const [activeSeries, setActiveSeries] = useState<EpisodeSeries>("masa_basi");

  // Separated episodes by series
  const masaBasiEpisodes = useMemo(
    () => mockEpisodes.filter((e) => e.series === "masa_basi"),
    [],
  );
  const yazilimaDairEpisodes = useMemo(
    () => mockEpisodes.filter((e) => e.series === "yazilima_dair"),
    [],
  );

  // Social video counts for limits display
  const igCount = useMemo(
    () =>
      mockSocialVideos.filter(
        (v) => v.platform === "instagram" && v.is_published,
      ).length,
    [],
  );
  const ytCount = useMemo(
    () =>
      mockSocialVideos.filter((v) => v.platform === "youtube" && v.is_published)
        .length,
    [],
  );

  const handleEditEpisode = (rows: AdminEpisode[]) => {
    if (rows.length === 1) {
      setEditingEpisode(rows[0]);
      setActiveTab("episode_form");
    }
  };

  const handleEditSocial = (rows: AdminSocialVideo[]) => {
    if (rows.length === 1) {
      setEditingSocial(rows[0]);
      setActiveTab("social_form");
    }
  };

  const handleEpisodeFormClose = () => {
    setEditingEpisode(undefined);
    const prevTab =
      editingEpisode?.series === "yazilima_dair"
        ? "yazilima_dair"
        : "masa_basi";
    setActiveTab(prevTab);
  };

  const handleSocialFormClose = () => {
    setEditingSocial(undefined);
    setActiveTab("social");
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2">
          Medya{" "}
          <Typography
            variant="h2"
            component="span"
            secondaryFont
            className="text-red-600"
          >
            Yönetimi
          </Typography>
        </Typography>
        <Typography variant="muted">
          Masa Başı, Yazılıma Dair bölümleri ve sosyal medya içeriklerini yönet.
        </Typography>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger
            value="masa_basi"
            onClick={() => setActiveSeries("masa_basi")}
          >
            Masa Başı
          </TabsTrigger>
          <TabsTrigger
            value="yazilima_dair"
            onClick={() => setActiveSeries("yazilima_dair")}
          >
            Yazılıma Dair
          </TabsTrigger>
          <TabsTrigger value="social">
            Sosyal Medya
            <span className="ml-1.5 text-xs text-slate-400 font-mono">
              ({igCount}/{SOCIAL_LIMITS.instagram} IG · {ytCount}/
              {SOCIAL_LIMITS.youtube} YT)
            </span>
          </TabsTrigger>
          <TabsTrigger value="episode_form">
            {editingEpisode ? "Bölüm Düzenle" : "Yeni Bölüm"}
          </TabsTrigger>
          <TabsTrigger value="social_form">
            {editingSocial ? "İçerik Düzenle" : "Yeni İçerik"}
          </TabsTrigger>
        </TabsList>

        {/* ── Masa Başı ── */}
        <TabsContent value="masa_basi" className="space-y-4">
          <div className="flex justify-between items-center">
            <Typography variant="h4">Masa Başı Bölümleri</Typography>
            <Button
              onClick={() => {
                setEditingEpisode(undefined);
                setActiveTab("episode_form");
              }}
            >
              Yeni Bölüm Ekle
            </Button>
          </div>
          <DataTable
            columns={masaBasiColumns}
            data={masaBasiEpisodes}
            getRowId={(row) => row.id}
            selectable
            onSelectionChange={handleEditEpisode}
            searchPlaceholder="Bölüm ara..."
            pageSize={10}
            emptyMessage="Masa Başı bölümü bulunamadı."
          />
        </TabsContent>

        {/* ── Yazılıma Dair ── */}
        <TabsContent value="yazilima_dair" className="space-y-4">
          <div className="flex justify-between items-center">
            <Typography variant="h4">Yazılıma Dair Bölümleri</Typography>
            <Button
              onClick={() => {
                setEditingEpisode(undefined);
                setActiveTab("episode_form");
              }}
            >
              Yeni Bölüm Ekle
            </Button>
          </div>
          <DataTable
            columns={yazilimaDairColumns}
            data={yazilimaDairEpisodes}
            getRowId={(row) => row.id}
            selectable
            onSelectionChange={handleEditEpisode}
            searchPlaceholder="Bölüm ara..."
            pageSize={10}
            emptyMessage="Yazılıma Dair bölümü bulunamadı."
          />
        </TabsContent>

        {/* ── Sosyal Medya ── */}
        <TabsContent value="social" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <Badge
                variant="outline"
                className="bg-pink-50 text-pink-700 border-pink-200"
              >
                Instagram: {igCount}/{SOCIAL_LIMITS.instagram} Reel
              </Badge>
              <Badge
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200"
              >
                YouTube: {ytCount}/{SOCIAL_LIMITS.youtube} Video
              </Badge>
            </div>
            <Button
              onClick={() => {
                setEditingSocial(undefined);
                setActiveTab("social_form");
              }}
            >
              Yeni İçerik Ekle
            </Button>
          </div>
          <DataTable
            columns={socialColumns}
            data={mockSocialVideos}
            getRowId={(row) => row.id}
            selectable
            onSelectionChange={handleEditSocial}
            searchPlaceholder="İçerik ara..."
            pageSize={10}
            emptyMessage="Sosyal medya içeriği bulunamadı."
          />
        </TabsContent>

        {/* ── Episode Form ── */}
        <TabsContent value="episode_form">
          <EpisodeForm
            episode={editingEpisode}
            defaultSeries={activeSeries}
            onCancel={handleEpisodeFormClose}
          />
        </TabsContent>

        {/* ── Social Form ── */}
        <TabsContent value="social_form">
          <SocialForm video={editingSocial} onCancel={handleSocialFormClose} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
