"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { PageMeta } from "@/lib/mdx";
import type { BlogMeta } from "@/lib/blog";
import type { NoteFile } from "@/lib/notes";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
  searchData: {
    pages: PageMeta[];
    blogPosts: BlogMeta[];
    notes: NoteFile[];
    socialLinks: { id: string; label: string; href: string }[];
  };
};

const SearchModal = ({ open, onClose, searchData }: SearchModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { pages, blogPosts, notes, socialLinks } = searchData;

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPages = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }
    return pages.filter((page) => {
      const haystack = [
        page.title,
        page.description ?? "",
        (page.tags ?? []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, pages]);

  const filteredBlogPosts = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }
    return blogPosts.filter((post) => {
      const haystack = [
        post.title,
        post.description ?? "",
        (post.tags ?? []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, blogPosts]);

  const filteredNotes = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }
    return notes.filter((note) => {
      const haystack = [
        note.title,
        note.description ?? "",
        (note.tags ?? []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, notes]);

  const filteredSocialLinks = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }
    return socialLinks.filter((social) =>
      social.label.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery, socialLinks]);

  useEffect(() => {
    if (!open) {
      return;
    }
    setQuery("");

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    inputRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleNavigate = (href: string, options?: { external?: boolean }) => {
    if (options?.external) {
      window.open(href, "_blank", "noopener,noreferrer");
      onClose();
      return;
    }
    router.push(href);
    onClose();
  };

  const hasResults =
    filteredPages.length +
      filteredBlogPosts.length +
      filteredNotes.length +
      filteredSocialLinks.length >
    0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Global search"
            className="flex w-full max-w-4xl flex-col items-center gap-8 rounded-[34px] border border-(--color-border) bg-(--color-background) px-10 py-12 text-center shadow-[0_50px_120px_rgba(0,0,0,0.55)] max-h-[85vh] overflow-y-auto"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="max-w-2xl text-sm text-(--color-muted)">
              Start typing below to quickly filter through case studies, long-form content, and open-source work.
            </p>

            <div className="flex w-full items-center gap-3 rounded-3xl border border-(--color-border) bg-(--color-surface) px-6 py-5">
              <Icon icon="solar:magnifer-line-duotone" className="text-2xl text-(--color-muted)" />
              <input
                ref={inputRef}
                type="search"
                placeholder="Type to search..."
                className="flex-1 bg-transparent text-lg text-(--color-text) placeholder:text-(--color-muted) focus:outline-none"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    if (filteredPages.length > 0) {
                      handleNavigate(`/${filteredPages[0].slug}`);
                    }
                  }
                }}
              />
              <span className="rounded-full border border-(--color-border) px-3 py-1 text-xs text-(--color-muted) hidden sm:flex">Enter</span>
            </div>

            {normalizedQuery ? (
              hasResults ? (
                <div className="w-full space-y-6 text-left">
                  {filteredPages.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-(--color-muted)">
                        Sayfalar
                      </p>
                      <div className="space-y-2">
                        {filteredPages.map((page) => (
                          <button
                            key={page.slug}
                            type="button"
                            onClick={() => handleNavigate(`/${page.slug}`)}
                            className="w-full rounded-2xl border border-(--color-border) bg-(--color-background)/80 px-5 py-4 text-left transition hover:border-(--color-accent) hover:bg-(--color-surface)"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-base font-semibold text-(--color-text)">
                                  {page.title}
                                </p>
                                {page.description && (
                                  <p className="text-sm text-(--color-muted)">
                                    {page.description}
                                  </p>
                                )}
                              </div>
                              <Icon
                                icon="solar:arrow-right-up-linear"
                                className="hidden text-xl text-(--color-muted) sm:block"
                              />
                            </div>
                            {page.tags?.length ? (
                              <div className="mt-3 flex flex-wrap gap-2 text-xs text-(--color-muted)">
                                {page.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-(--color-border) px-2 py-0.5"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredBlogPosts.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-(--color-muted)">
                        Blog
                      </p>
                      <div className="space-y-2">
                        {filteredBlogPosts.map((post) => (
                          <button
                            key={post.slug}
                            type="button"
                            onClick={() => handleNavigate(`/blog/${post.slug}`)}
                            className="w-full rounded-2xl border border-(--color-border) bg-(--color-background)/80 px-5 py-4 text-left transition hover:border-(--color-accent) hover:bg-(--color-surface)"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-base font-semibold text-(--color-text)">
                                  {post.title}
                                </p>
                                {post.description && (
                                  <p className="text-sm text-(--color-muted)">
                                    {post.description}
                                  </p>
                                )}
                              </div>
                              <Icon
                                icon="solar:arrow-right-up-linear"
                                className="hidden text-xl text-(--color-muted) sm:block"
                              />
                            </div>
                            {post.date && (
                              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-(--color-muted)">
                                {post.date}
                              </p>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredNotes.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-(--color-muted)">
                        Notes
                      </p>
                      <div className="space-y-2">
                        {filteredNotes.map((note) => (
                          <button
                            key={note.slug}
                            type="button"
                            onClick={() =>
                              handleNavigate(
                                `/api/notes/${encodeURIComponent(note.slug)}`,
                                { external: true },
                              )
                            }
                            className="w-full rounded-2xl border border-(--color-border) bg-(--color-background)/80 px-5 py-3 text-left transition hover:border-(--color-accent) hover:bg-(--color-surface)"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="space-y-1">
                                <p className="text-base font-semibold text-(--color-text)">
                                  {note.title}
                                </p>
                                {note.description && (
                                  <p className="text-sm text-(--color-muted)">
                                    {note.description}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] text-(--color-muted)">
                                  <span>PDF Note</span>
                                  {note.date && <span>{note.date}</span>}
                                </div>
                                {note.tags?.length ? (
                                  <div className="flex flex-wrap gap-2 text-xs text-(--color-muted)">
                                    {note.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="rounded-full border border-(--color-border) px-2 py-0.5"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                              <Icon
                                icon="solar:download-bold-duotone"
                                className="text-xl text-(--color-muted)"
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSocialLinks.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-(--color-muted)">
                        Sosyal
                      </p>
                      <div className="space-y-2">
                        {filteredSocialLinks.map((social) => (
                          <button
                            key={social.id}
                            type="button"
                            onClick={() =>
                              handleNavigate(social.href, { external: true })
                            }
                            className="flex w-full items-center justify-between rounded-2xl border border-(--color-border) bg-(--color-background)/80 px-5 py-3 text-left transition hover:border-(--color-accent) hover:bg-(--color-surface)"
                          >
                            <span className="text-base font-semibold text-(--color-text)">
                              {social.label}
                            </span>
                            <Icon
                              icon="solar:arrow-right-up-linear"
                              className="text-xl text-(--color-muted)"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="w-full rounded-2xl border border-dashed border-(--color-border) px-5 py-6 text-center text-sm text-(--color-muted)">
                  “{query}” için sonuç bulunamadı. Lütfen farklı bir terim deneyin.
                </p>
              )
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
