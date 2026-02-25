"use server";

import { createClient } from "../server";
import { AdminReadingItem, ReadingItemType } from "@/types/admin";
import { revalidatePath } from "next/cache";

export async function getAdminReadingItems(): Promise<AdminReadingItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reading_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin reading items:", error);
    return [];
  }

  return data as AdminReadingItem[];
}

export async function getPublishedReadingItems(
  type?: ReadingItemType,
): Promise<AdminReadingItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("reading_items")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching published reading items (${type}):`, error);
    return [];
  }

  return data as AdminReadingItem[];
}

export async function createReadingItem(
  data: Omit<AdminReadingItem, "id" | "created_at" | "updated_at">,
): Promise<AdminReadingItem | null> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .from("reading_items")
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error("Error creating reading item:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/reading-list");
  revalidatePath("/academy/reading-list");

  return result as AdminReadingItem;
}

export async function updateReadingItem(
  id: string,
  data: Partial<AdminReadingItem>,
): Promise<AdminReadingItem | null> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .from("reading_items")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating reading item:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/reading-list");
  revalidatePath("/academy/reading-list");

  return result as AdminReadingItem;
}

export async function deleteReadingItem(id: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("reading_items").delete().eq("id", id);

  if (error) {
    console.error("Error deleting reading item:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/reading-list");
  revalidatePath("/academy/reading-list");

  return true;
}

export async function uploadReadingItemImage(
  file: File,
  path: string,
): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("reading-list-images")
    .upload(path, file, { upsert: true });

  if (error) {
    console.error("Error uploading reading item image:", error);
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from("reading-list-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
