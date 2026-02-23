import { createClient } from "@/lib/supabase/client";
import { AdminProject } from "@/types/admin";

export async function getProjects() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data as AdminProject[];
}

export async function getProjectBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }

  return data as AdminProject;
}

export async function createProject(project: Partial<AdminProject>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }

  return data as AdminProject;
}

export async function updateProject(
  id: string,
  updates: Partial<AdminProject>,
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    throw error;
  }

  return data as AdminProject;
}

export async function deleteProject(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }

  return true;
}

export async function uploadProjectImage(
  file: File,
  path: string,
): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("project-images")
    .upload(path, file, { upsert: true });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from("project-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
