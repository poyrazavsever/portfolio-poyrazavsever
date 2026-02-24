import { createClient } from "../client";
import { AdminBlogPost, AdminBlogComment } from "@/types/admin";
import { unstable_noStore as noStore } from "next/cache";

export async function getAdminBlogPosts(): Promise<AdminBlogPost[]> {
  noStore();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin blog posts:", error);
    return [];
  }

  return data as AdminBlogPost[];
}

export async function getPublishedBlogPosts(): Promise<AdminBlogPost[]> {
  const supabase = createClient();

  // For frontend, only fetch published posts
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching published blog posts:", error);
    return [];
  }

  return data as AdminBlogPost[];
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<AdminBlogPost | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }

  return data as AdminBlogPost;
}

export async function createBlogPost(
  post: Omit<AdminBlogPost, "id" | "created_at" | "updated_at">,
): Promise<{ data: AdminBlogPost | null; error: Error | null }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    return { data: null, error: new Error(error.message) };
  }

  return { data: data as AdminBlogPost, error: null };
}

export async function updateBlogPost(
  id: string,
  post: Partial<AdminBlogPost>,
): Promise<{ data: AdminBlogPost | null; error: Error | null }> {
  const supabase = createClient();

  // Exclude fields that shouldn't be updated directly like this
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const { id: _, created_at, updated_at, ...updateData } = post as any;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("blog_posts")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    return { data: null, error: new Error(error.message) };
  }

  return { data: data as AdminBlogPost, error: null };
}

export async function deleteBlogPost(
  id: string,
): Promise<{ error: Error | null }> {
  const supabase = createClient();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    return { error: new Error(error.message) };
  }

  return { error: null };
}

// ── COMMENTS ──

export async function getAdminComments(): Promise<AdminBlogComment[]> {
  noStore();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog comments:", error);
    return [];
  }

  return data as AdminBlogComment[];
}

export async function approveComment(
  id: string,
): Promise<{ error: Error | null }> {
  const supabase = createClient();

  const { error } = await supabase
    .from("blog_comments")
    .update({ is_approved: true })
    .eq("id", id);

  if (error) {
    console.error("Error approving comment:", error);
    return { error: new Error(error.message) };
  }

  return { error: null };
}

export async function deleteComment(
  id: string,
): Promise<{ error: Error | null }> {
  const supabase = createClient();

  const { error } = await supabase.from("blog_comments").delete().eq("id", id);

  if (error) {
    console.error("Error deleting comment:", error);
    return { error: new Error(error.message) };
  }

  return { error: null };
}

// Exported for frontend use
export async function createComment(
  comment: Omit<
    AdminBlogComment,
    "id" | "created_at" | "is_approved" | "post_title"
  > & { post_title?: string },
): Promise<{ error: Error | null }> {
  const supabase = createClient();

  // If post_title is not provided, fetch it
  let title = comment.post_title;
  if (!title) {
    const { data } = await supabase
      .from("blog_posts")
      .select("title_tr")
      .eq("id", comment.post_id)
      .single();
    title = data?.title_tr || "Unknown Post";
  }

  const { error } = await supabase
    .from("blog_comments")
    .insert([{ ...comment, post_title: title }]);

  if (error) {
    console.error("Error creating comment:", error);
    return { error: new Error(error.message) };
  }

  return { error: null };
}

export async function uploadBlogImage(
  file: File,
  path: string,
): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("blog-images")
    .upload(path, file, { upsert: true });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from("blog-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

// ── LIKES (Frontend) ──

export async function getLikesCount(postId: string): Promise<number> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("blog_likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching likes count:", error);
    return 0;
  }

  return count || 0;
}

export async function getUserLikeStatus(
  postId: string,
  userId: string,
): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching like status:", error);
    return false;
  }

  return !!data;
}

export async function toggleLike(
  postId: string,
  userId: string,
): Promise<{ liked: boolean; error: Error | null }> {
  const supabase = createClient();

  // Mevcut beğeni var mı kontrol et
  const { data: existing } = await supabase
    .from("blog_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    // Beğeniyi kaldır
    const { error } = await supabase
      .from("blog_likes")
      .delete()
      .eq("id", existing.id);

    if (error) {
      console.error("Error removing like:", error);
      return { liked: true, error: new Error(error.message) };
    }
    return { liked: false, error: null };
  } else {
    // Beğeni ekle
    const { error } = await supabase
      .from("blog_likes")
      .insert([{ post_id: postId, user_id: userId }]);

    if (error) {
      console.error("Error adding like:", error);
      return { liked: false, error: new Error(error.message) };
    }
    return { liked: true, error: null };
  }
}

// ── PUBLIC COMMENTS (Frontend) ──

export interface PublicComment {
  id: string;
  user_name: string;
  user_avatar: string | null;
  content: string;
  created_at: string;
  is_approved: boolean;
  user_id?: string;
}

export async function getApprovedComments(
  postId: string,
): Promise<PublicComment[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_comments")
    .select(
      "id, user_name, user_avatar, content, created_at, is_approved, user_id",
    )
    .eq("post_id", postId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching approved comments:", error);
    return [];
  }

  return data as PublicComment[];
}

export async function getUserPendingComments(
  postId: string,
  userId: string,
): Promise<PublicComment[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_comments")
    .select(
      "id, user_name, user_avatar, content, created_at, is_approved, user_id",
    )
    .eq("post_id", postId)
    .eq("user_id", userId)
    .eq("is_approved", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user pending comments:", error);
    return [];
  }

  return data as PublicComment[];
}

// Spam koruması: son 1 dakikada aynı post'a 2'den fazla yorum yapılamaz
export async function checkCommentSpam(
  postId: string,
  userId: string,
): Promise<boolean> {
  const supabase = createClient();
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("blog_comments")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId)
    .eq("user_id", userId)
    .gte("created_at", oneMinuteAgo);

  if (error) {
    console.error("Error checking spam:", error);
    return false;
  }

  // 1 dakikada 2'den fazla yorum varsa spam
  return (count || 0) >= 2;
}

export async function submitComment(
  postId: string,
  userId: string,
  userName: string,
  userAvatar: string | null,
  content: string,
): Promise<{ error: Error | null }> {
  const supabase = createClient();

  // post_title'ı çek
  const { data: postData } = await supabase
    .from("blog_posts")
    .select("title_tr")
    .eq("id", postId)
    .single();

  const { error } = await supabase.from("blog_comments").insert([
    {
      post_id: postId,
      user_id: userId,
      user_name: userName,
      user_avatar: userAvatar,
      post_title: postData?.title_tr || "Blog Post",
      content,
      is_approved: false,
    },
  ]);

  if (error) {
    console.error("Error submitting comment:", error);
    return { error: new Error(error.message) };
  }

  return { error: null };
}
