"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Badge, Typography, Button } from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import { AdminProject, PROJECT_TYPE_LABELS } from "@/types/admin";
import { ProjectForm } from "./ProjectForm";
import { getProjects } from "@/lib/supabase/queries/projects";
import { Pencil } from "lucide-react";

export function ProjectsTable() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<AdminProject | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("list");
  const [isMounted, setIsMounted] = useState(false);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEdit = useCallback((project: AdminProject) => {
    setEditingProject(project);
    setActiveTab("form");
  }, []);

  const handleFormClose = useCallback(
    (shouldRefresh?: boolean) => {
      setEditingProject(null);
      setActiveTab("list");
      if (shouldRefresh) {
        fetchProjects();
      }
    },
    [fetchProjects],
  );

  const columns = useMemo<DataTableColumnDef<AdminProject>[]>(
    () => [
      {
        id: "title",
        header: "Başlık",
        accessorKey: "title_tr",
        sortable: true,
      },
      {
        id: "type",
        header: "Tür",
        accessorKey: "type",
        cell: (row) => (
          <Badge variant="secondary">{PROJECT_TYPE_LABELS[row.type]}</Badge>
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
        id: "featured",
        header: "Öne Çıkan",
        accessorKey: "featured",
        cell: (row) => (row.featured ? "⭐" : "—"),
      },
      {
        id: "sort_order",
        header: "Sıra",
        accessorKey: "sort_order",
        sortable: true,
      },
      {
        id: "created_at",
        header: "Tarih",
        accessorKey: "created_at",
        cell: (row) => new Date(row.created_at).toLocaleDateString("tr-TR"),
        sortable: true,
      },
      {
        id: "actions",
        header: "İşlemler",
        accessorKey: "id",
        cell: (row) => (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
          >
            <Pencil className="w-4 h-4 mr-2" /> Düzenle
          </Button>
        ),
      },
    ],
    [handleEdit],
  );

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2">
          Proje{" "}
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
          Tüm projelerini buradan yönetebilirsin.
        </Typography>
      </div>

      {!isMounted ? null : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list">Projeler</TabsTrigger>
            <TabsTrigger value="form">
              {editingProject ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <DataTable
              columns={columns}
              data={projects}
              getRowId={(row) => row.id}
              searchPlaceholder="Proje ara..."
              pageSize={10}
              emptyMessage={isLoading ? "Yükleniyor..." : "Proje bulunamadı."}
            />
          </TabsContent>

          <TabsContent value="form">
            <ProjectForm
              project={editingProject || undefined}
              onCancel={handleFormClose}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
