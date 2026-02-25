"use server";

import { createClient } from "@/lib/supabase/server";
import { AdminCareerItem, CareerItemType } from "@/types/admin";
import { unstable_noStore as noStore } from "next/cache";

export async function getAdminCareerRecords(): Promise<AdminCareerItem[]> {
  noStore();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("career_records")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin career records:", error);
    return [];
  }

  return (data || []) as AdminCareerItem[];
}

export async function getPublishedCareerRecords(
  type?: CareerItemType,
): Promise<AdminCareerItem[]> {
  noStore();
  const supabase = await createClient();

  const query = supabase
    .from("career_records")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (type) {
    query.eq("type", type);
  } else {
    // Often we might want work + volunteer together, so if no type is passed, we fetch everything
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching published career records:", error);
    return [];
  }

  return (data || []) as AdminCareerItem[];
}

export async function getPublishedExperienceRecords(): Promise<
  AdminCareerItem[]
> {
  noStore();
  const supabase = await createClient();

  // Custom fetch to get both 'work' and 'volunteer' in one query
  const { data, error } = await supabase
    .from("career_records")
    .select("*")
    .eq("is_published", true)
    .in("type", ["work", "volunteer"])
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published experience records:", error);
    return [];
  }

  return (data || []) as AdminCareerItem[];
}

export async function createCareerRecord(
  record: Omit<AdminCareerItem, "id" | "created_at">,
): Promise<{ data: AdminCareerItem | null; error: Error | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("career_records")
    .insert([record])
    .select()
    .single();

  if (error) {
    console.error("Error creating career record:", error);
    return { data: null, error: new Error(error.message) };
  }

  return { data: data as AdminCareerItem, error: null };
}

export async function updateCareerRecord(
  id: string,
  record: Partial<Omit<AdminCareerItem, "id" | "created_at">>,
): Promise<{ data: AdminCareerItem | null; error: Error | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("career_records")
    .update(record)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating career record:", error);
    return { data: null, error: new Error(error.message) };
  }

  return { data: data as AdminCareerItem, error: null };
}

export async function deleteCareerRecord(id: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("career_records").delete().eq("id", id);

  if (error) {
    console.error("Error deleting career record:", error);
    return false;
  }

  return true;
}
