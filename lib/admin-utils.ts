/**
 * Generates a URL-friendly slug from a Turkish or English string.
 * Handles Turkish characters (ç, ğ, ı, ö, ş, ü) and special chars.
 */
export function generateSlug(text: string): string {
  const turkishMap: Record<string, string> = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  return text
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => turkishMap[char] || char)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Estimates reading time in minutes from text content.
 * Average reading speed: ~200 words per minute (Turkish).
 */
export function estimateReadTime(content: string): number {
  if (!content) return 0;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
