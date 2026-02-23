"use client";

import { useState, useEffect } from "react";
import { Badge, Typography } from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import { AdminProject, PROJECT_TYPE_LABELS } from "@/types/admin";
import { mockProjects } from "@/data/admin/mock-projects";
import { ProjectForm } from "./ProjectForm";

const columns: DataTableColumnDef<AdminProject>[] = [
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
];

export function ProjectsTable() {
  const [editingProject, setEditingProject] = useState<
    AdminProject | undefined
  >();
  const [activeTab, setActiveTab] = useState("list");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEdit = (rows: AdminProject[]) => {
    if (rows.length === 1) {
      setEditingProject(rows[0]);
      setActiveTab("form");
    }
  };

  const handleFormClose = () => {
    setEditingProject(undefined);
    setActiveTab("list");
  };

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
              data={mockProjects}
              getRowId={(row) => row.id}
              selectable
              onSelectionChange={handleEdit}
              searchPlaceholder="Proje ara..."
              pageSize={10}
              emptyMessage="Proje bulunamadı."
            />
          </TabsContent>

          <TabsContent value="form">
            <ProjectForm project={editingProject} onCancel={handleFormClose} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
