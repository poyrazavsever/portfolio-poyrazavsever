import { createClient } from "../client";
import { AdminEpisode, AdminSocialVideo } from "@/types/admin";
import { unstable_noStore as noStore } from "next/cache";

// ── EPISODES (Admin) ──

export async function getAdminEpisodes(
  series: string,
): Promise<AdminEpisode[]> {
  noStore();
  const supabase = createClient();
  const table =
    series === "masa_basi" ? "masa_basi_episodes" : "yazilima_dair_episodes";

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching ${series} episodes:`, error);
    return [];
  }

  // Inject series back into the result for frontend compatibility if needed
  return (data || []).map((ep) => ({
    ...ep,
    series: series as any,
  })) as AdminEpisode[];
}

export async function createEpisode(
  episode: Omit<AdminEpisode, "id" | "created_at" | "updated_at">,
): Promise<{ data: AdminEpisode | null; error: Error | null }> {
  const supabase = createClient();
  const table =
    episode.series === "masa_basi"
      ? "masa_basi_episodes"
      : "yazilima_dair_episodes";

  // Exclude series before inserting if the DB schema doesn't have it
  const { series, ...insertData } = episode as any;

  const { data, error } = await supabase
    .from(table)
    .insert([insertData])
    .select()
    .single();

  if (error) {
    console.error(`Error creating ${episode.series} episode:`, error);
    return { data: null, error: new Error(error.message) };
  }

  return {
    data: { ...data, series: episode.series } as AdminEpisode,
    error: null,
  };
}

export async function updateEpisode(
  series: string,
  id: string,
  episode: Partial<AdminEpisode>,
): Promise<{ data: AdminEpisode | null; error: Error | null }> {
  const supabase = createClient();
  const table =
    series === "masa_basi" ? "masa_basi_episodes" : "yazilima_dair_episodes";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const {
    id: _,
    created_at,
    updated_at,
    series: __,
    ...updateData
  } = episode as any;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from(table)
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating ${series} episode:`, error);
    return { data: null, error: new Error(error.message) };
  }

  return { data: { ...data, series } as AdminEpisode, error: null };
}

export async function deleteEpisode(
  series: string,
  id: string,
): Promise<{ error: Error | null }> {
  const supabase = createClient();
  const table =
    series === "masa_basi" ? "masa_basi_episodes" : "yazilima_dair_episodes";

  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    console.error(`Error deleting ${series} episode:`, error);
    return { error: new Error(error.message) };
  }

  return { error: null };
}

export async function uploadGuestImage(
  file: File,
  path: string,
): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("media-images")
    .upload(path, file, { upsert: true });

  if (error) {
    console.error("Error uploading guest image:", error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from("media-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

// ── EPISODES (Frontend) ──

export async function getPublishedEpisodes(
  series: string,
): Promise<AdminEpisode[]> {
  const supabase = createClient();
  const table =
    series === "masa_basi" ? "masa_basi_episodes" : "yazilima_dair_episodes";

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("is_published", true)
    .order("episode_number", { ascending: false });

  if (error) {
    console.error(`Error fetching published ${series} episodes:`, error);
    return [];
  }

  return (data || []).map((ep) => ({
    ...ep,
    series: series as any,
  })) as AdminEpisode[];
}

export async function getUpcomingEpisode(): Promise<AdminEpisode | null> {
  const supabase = createClient();

  // Upcoming episodes apply to "Masa Başı" primarily based on current usage
  const table = "masa_basi_episodes";

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("is_upcoming", true)
    .eq("is_published", true)
    .order("date", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching upcoming episode:", error);
    return null;
  }

  if (data) {
    return { ...data, series: "masa_basi" as any } as AdminEpisode;
  }

  return null;
}

// ── SOCIAL VIDEOS (Admin) ──

export async function getAdminSocialVideos(): Promise<AdminSocialVideo[]> {
  noStore();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("social_videos")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching social videos:", error);
    return [];
  }

  return data as AdminSocialVideo[];
}

export async function createSocialVideo(
  video: Omit<AdminSocialVideo, "id" | "created_at">,
): Promise<{ data: AdminSocialVideo | null; error: Error | null }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("social_videos")
    .insert([video])
    .select()
    .single();

  if (error) {
    console.error("Error creating social video:", error);
    return { data: null, error: new Error(error.message) };
  }

  return { data: data as AdminSocialVideo, error: null };
}

export async function updateSocialVideo(
  id: string,
  video: Partial<AdminSocialVideo>,
): Promise<{ data: AdminSocialVideo | null; error: Error | null }> {
  const supabase = createClient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const { id: _, created_at, ...updateData } = video as any;

  const { data, error } = await supabase
    .from("social_videos")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating social video:", error);
    return { data: null, error: new Error(error.message) };
  }

  return { data: data as AdminSocialVideo, error: null };
}

export async function deleteSocialVideo(
  id: string,
): Promise<{ error: Error | null }> {
  const supabase = createClient();

  const { error } = await supabase.from("social_videos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting social video:", error);
    return { error: new Error(error.message) };
  }

  return { error: null };
}

// ── SOCIAL VIDEOS (Frontend) ──

export async function getPublishedSocialVideos(
  platform?: string,
): Promise<AdminSocialVideo[]> {
  const supabase = createClient();

  let query = supabase
    .from("social_videos")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (platform) {
    query = query.eq("platform", platform);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching published social videos:", error);
    return [];
  }

  return data as AdminSocialVideo[];
}
