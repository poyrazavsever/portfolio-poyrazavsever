"use server";

import { createClient } from "../server";
import { AdminCertification } from "@/types/admin";
import { revalidatePath } from "next/cache";

export async function getAdminCertifications(): Promise<AdminCertification[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin certifications:", error);
    return [];
  }

  return data as AdminCertification[];
}

export async function getPublishedCertifications(): Promise<
  AdminCertification[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published certifications:", error);
    return [];
  }

  return data as AdminCertification[];
}

export async function createCertification(
  data: Omit<AdminCertification, "id" | "created_at" | "updated_at">,
): Promise<AdminCertification | null> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .from("certifications")
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error("Error creating certification:", error);
    throw error;
  }

  revalidatePath("/admin/certifications");
  revalidatePath("/academy/certifications");

  return result as AdminCertification;
}

export async function updateCertification(
  id: string,
  data: Partial<AdminCertification>,
): Promise<AdminCertification | null> {
  const supabase = await createClient();

  const { data: result, error } = await supabase
    .from("certifications")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating certification:", error);
    throw error;
  }

  revalidatePath("/admin/certifications");
  revalidatePath("/academy/certifications");

  return result as AdminCertification;
}

export async function deleteCertification(id: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("certifications").delete().eq("id", id);

  if (error) {
    console.error("Error deleting certification:", error);
    throw error;
  }

  revalidatePath("/admin/certifications");
  revalidatePath("/academy/certifications");

  return true;
}

export async function uploadCertificationImage(
  file: File,
  path: string,
): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("certification-images")
    .upload(path, file, { upsert: true });

  if (error) {
    console.error("Error uploading certification image:", error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from("certification-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
