"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Badge, Button, Typography } from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import {
  AdminBlogPost,
  AdminBlogComment,
  BLOG_CATEGORY_LABELS,
} from "@/types/admin";
import { BlogForm } from "./BlogForm";
import { Check, X, Pencil, Trash2 } from "lucide-react";
import {
  getAdminBlogPosts,
  getAdminComments,
  approveComment,
  deleteComment,
  deleteBlogPost,
} from "@/lib/supabase/queries/blog";

export function BlogTable() {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [comments, setComments] = useState<AdminBlogComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<AdminBlogPost | undefined>();
  const [activeTab, setActiveTab] = useState("posts");
  const [isMounted, setIsMounted] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const [fetchedPosts, fetchedComments] = await Promise.all([
      getAdminBlogPosts(),
      getAdminComments(),
    ]);
    setPosts(fetchedPosts);
    setComments(fetchedComments);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    fetchData();
  }, [fetchData]);

  const handleEdit = useCallback((row: AdminBlogPost) => {
    setEditingPost(row);
    setActiveTab("form");
  }, []);

  const handleDeletePost = useCallback(
    async (id: string) => {
      if (window.confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
        await deleteBlogPost(id);
        fetchData();
      }
    },
    [fetchData],
  );

  const handleApprove = useCallback(
    async (id: string) => {
      await approveComment(id);
      fetchData();
    },
    [fetchData],
  );

  const handleDeleteComment = useCallback(
    async (id: string) => {
      if (window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
        await deleteComment(id);
        fetchData();
      }
    },
    [fetchData],
  );

  const handleFormClose = useCallback(
    (shouldRefresh?: boolean) => {
      setEditingPost(undefined);
      setActiveTab("posts");
      if (shouldRefresh) {
        fetchData();
      }
    },
    [fetchData],
  );

  const postColumns = useMemo<DataTableColumnDef<AdminBlogPost>[]>(
    () => [
      {
        id: "title",
        header: "Başlık",
        accessorKey: "title_tr",
        sortable: true,
      },
      {
        id: "category",
        header: "Kategori",
        accessorKey: "category",
        cell: (row) =>
          row.category ? (
            <Badge variant="secondary">
              {BLOG_CATEGORY_LABELS[row.category]}
            </Badge>
          ) : (
            "—"
          ),
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
      {
        id: "read_time",
        header: "Okuma",
        accessorKey: "read_time_min",
        cell: (row) => (row.read_time_min ? `${row.read_time_min} dk` : "—"),
      },
      {
        id: "published_at",
        header: "Yayın Tarihi",
        accessorKey: "published_at",
        cell: (row) =>
          row.published_at
            ? new Date(row.published_at).toLocaleDateString("tr-TR")
            : "—",
        sortable: true,
      },
      {
        id: "actions",
        header: "İşlemler",
        accessorKey: "id",
        cell: (row) => (
          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="outline" size="sm" onClick={() => handleEdit(row)}>
              <Pencil className="w-4 h-4 mr-2" /> Düzenle
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => handleDeletePost(row.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [handleEdit, handleDeletePost],
  );

  const commentColumns = useMemo<DataTableColumnDef<AdminBlogComment>[]>(
    () => [
      {
        id: "user",
        header: "Kullanıcı",
        accessorKey: "user_name",
      },
      {
        id: "content",
        header: "Yorum",
        accessorKey: "content",
        cell: (row) => (
          <span className="line-clamp-2 max-w-xs">{row.content}</span>
        ),
      },
      {
        id: "post",
        header: "Yazı",
        accessorKey: "post_title",
        cell: (row) => (
          <span className="text-slate-500 text-sm">{row.post_title}</span>
        ),
      },
      {
        id: "status",
        header: "Durum",
        accessorKey: "is_approved",
        cell: (row) =>
          row.is_approved ? (
            <Badge variant="default">Onaylı</Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-amber-600 border-amber-300 bg-amber-50"
            >
              Bekliyor
            </Badge>
          ),
      },
      {
        id: "date",
        header: "Tarih",
        accessorKey: "created_at",
        cell: (row) => new Date(row.created_at).toLocaleDateString("tr-TR"),
        sortable: true,
      },
      {
        id: "actions",
        header: "Aksiyon",
        accessorKey: "id",
        cell: (row) =>
          !row.is_approved ? (
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2 text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
                onClick={() => handleApprove(row.id)}
              >
                <Check className="w-3 h-3 mr-1" />
                Onayla
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2 text-red-600 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
                onClick={() => handleDeleteComment(row.id)}
              >
                <X className="w-3 h-3 mr-1" />
                Sil
              </Button>
            </div>
          ) : (
            <div onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2 text-red-600 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
                onClick={() => handleDeleteComment(row.id)}
              >
                <X className="w-3 h-3 mr-1" />
                Sil
              </Button>
            </div>
          ),
      },
    ],
    [handleApprove, handleDeleteComment],
  );

  const pendingCount = comments.filter((c) => !c.is_approved).length;

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2">
          Blog{" "}
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
          Blog yazılarını ve yorumları buradan yönetebilirsin.
        </Typography>
      </div>

      {!isMounted ? null : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="posts">Yazılar</TabsTrigger>
            <TabsTrigger value="comments">
              Yorumlar
              {pendingCount > 0 && (
                <Badge variant="default" className="ml-2 h-5 px-1.5 text-xs">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="form">
              {editingPost ? "Yazıyı Düzenle" : "Yeni Yazı Ekle"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <DataTable
              columns={postColumns}
              data={posts}
              getRowId={(row) => row.id}
              selectable
              onSelectionChange={(rows) => {
                if (rows.length === 1) handleEdit(rows[0]);
              }}
              searchPlaceholder="Yazı ara..."
              pageSize={10}
              emptyMessage={isLoading ? "Yükleniyor..." : "Yazı bulunamadı."}
            />
          </TabsContent>

          <TabsContent value="comments">
            <DataTable
              columns={commentColumns}
              data={comments}
              getRowId={(row) => row.id}
              searchPlaceholder="Yorum ara..."
              pageSize={10}
              emptyMessage={isLoading ? "Yükleniyor..." : "Yorum bulunamadı."}
            />
          </TabsContent>

          <TabsContent value="form">
            <BlogForm post={editingPost} onCancel={handleFormClose} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
