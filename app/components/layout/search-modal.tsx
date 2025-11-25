"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { PageMeta } from "@/lib/mdx";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
  pages: PageMeta[];
};

const SearchModal = ({ open, onClose, pages }: SearchModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPages = useMemo(() => {
    if (!normalizedQuery) {
      return pages;
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

  const handleSelect = (slug: string) => {
    router.push(`/${slug}`);
    onClose();
  };

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
                      handleSelect(filteredPages[0].slug);
                    }
                  }
                }}
              />
              <span className="rounded-full border border-(--color-border) px-3 py-1 text-xs text-(--color-muted) hidden sm:flex">Enter</span>
            </div>

            {normalizedQuery ? (
              <div className="w-full space-y-2 text-left">
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <button
                      key={page.slug}
                      type="button"
                      onClick={() => handleSelect(page.slug)}
                      className="w-full rounded-2xl border border-(--color-border) bg-(--color-background)/80 px-5 py-4 text-left transition hover:border-(--color-accent) hover:bg-(--color-surface)"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-base font-semibold text-(--color-text)">{page.title}</p>
                          {page.description && (
                            <p className="text-sm text-(--color-muted)">{page.description}</p>
                          )}
                        </div>
                        <Icon icon="solar:arrow-right-up-linear" className="hidden text-xl text-(--color-muted) sm:block" />
                      </div>
                      {page.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-(--color-muted)">
                          {page.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="rounded-full border border-(--color-border) px-2 py-0.5">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </button>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-(--color-border) px-5 py-6 text-center text-sm text-(--color-muted)">
                    No results for &ldquo;{query}&rdquo;. Try another term.
                  </p>
                )}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
