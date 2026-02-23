"use client";

import { useState, useMemo, useEffect } from "react";
import { Badge, Button, Typography } from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { DataTable } from "poyraz-ui/organisms";
import type { DataTableColumnDef } from "poyraz-ui/organisms";
import {
  AdminReadingItem,
  ReadingItemType,
  READING_STATUS_LABELS,
} from "@/types/admin";
import { mockReadingItems } from "@/data/admin/mock-reading-list";
import { ReadingListForm } from "./ReadingListForm";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "read":
    case "watched":
      return (
        <Badge className="bg-emerald-500 text-white border-none">
          {READING_STATUS_LABELS[status as keyof typeof READING_STATUS_LABELS]}
        </Badge>
      );
    case "reading":
    case "watching":
      return (
        <Badge className="bg-amber-500 text-white border-none">
          {READING_STATUS_LABELS[status as keyof typeof READING_STATUS_LABELS]}
        </Badge>
      );
    default:
      return (
        <Badge className="bg-slate-500 text-white border-none">
          {READING_STATUS_LABELS[status as keyof typeof READING_STATUS_LABELS]}
        </Badge>
      );
  }
};

const columns: DataTableColumnDef<AdminReadingItem>[] = [
  {
    id: "cover",
    header: "Görsel",
    accessorKey: "image",
    cell: (row) => (
      <div
        className={`border border-slate-200 rounded overflow-hidden flex items-center justify-center bg-slate-50 ${row.type === "book" ? "w-10 h-14" : "w-16 h-10"}`}
      >
        {row.image ? (
          <img
            src={row.image}
            alt={row.title_tr}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[10px] text-slate-300">N/A</span>
        )}
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
    id: "author",
    header: "Yazar / Kanal",
    accessorKey: "author_tr",
    sortable: true,
  },
  {
    id: "status",
    header: "Durum",
    accessorKey: "status",
    cell: (row) => getStatusBadge(row.status),
  },
  {
    id: "visibility",
    header: "Görünürlük",
    accessorKey: "is_published",
    cell: (row) =>
      row.is_published ? (
        <Badge variant="default">Yayında</Badge>
      ) : (
        <Badge variant="outline">Taslak</Badge>
      ),
  },
];

export function ReadingListTable() {
  const [activeTab, setActiveTab] = useState("books");
  const [editingItem, setEditingItem] = useState<
    AdminReadingItem | undefined
  >();
  const [formType, setFormType] = useState<ReadingItemType>("book");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const books = useMemo(
    () => mockReadingItems.filter((i) => i.type === "book"),
    [],
  );
  const videos = useMemo(
    () => mockReadingItems.filter((i) => i.type === "video"),
    [],
  );

  const handleEdit = (rows: AdminReadingItem[]) => {
    if (rows.length === 1) {
      setEditingItem(rows[0]);
      setFormType(rows[0].type);
      setActiveTab("form");
    }
  };

  const handleAddNew = (type: ReadingItemType) => {
    setEditingItem(undefined);
    setFormType(type);
    setActiveTab("form");
  };

  const handleFormClose = () => {
    setEditingItem(undefined);
    setActiveTab(formType === "book" ? "books" : "videos");
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2">
          Okuma Listesi{" "}
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
          Kitap ve video içerik listesini yönet.
        </Typography>
      </div>

      {!isMounted ? null : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="books">Kitaplar</TabsTrigger>
            <TabsTrigger value="videos">Videolar</TabsTrigger>
            <TabsTrigger value="form">
              {editingItem ? "Düzenle" : "Yeni Ekle"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4">Kitap Listesi</Typography>
              <Button onClick={() => handleAddNew("book")}>
                Yeni Kitap Ekle
              </Button>
            </div>
            <DataTable
              columns={columns}
              data={books}
              getRowId={(row) => row.id}
              selectable
              onSelectionChange={handleEdit}
              searchPlaceholder="Kitap ara..."
              pageSize={10}
              emptyMessage="Henüz bir kitap eklenmemiş."
            />
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4">Video Listesi</Typography>
              <Button onClick={() => handleAddNew("video")}>
                Yeni Video Ekle
              </Button>
            </div>
            <DataTable
              columns={columns}
              data={videos}
              getRowId={(row) => row.id}
              selectable
              onSelectionChange={handleEdit}
              searchPlaceholder="Video ara..."
              pageSize={10}
              emptyMessage="Henüz bir video eklenmemiş."
            />
          </TabsContent>

          <TabsContent value="form">
            <ReadingListForm
              item={editingItem}
              defaultType={formType}
              onCancel={handleFormClose}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
