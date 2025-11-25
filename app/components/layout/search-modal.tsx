"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    inputRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

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
            className="flex w-full max-w-4xl flex-col items-center gap-8 rounded-[34px] border border-(--color-border) bg-(--color-background) px-10 py-12 text-center shadow-[0_50px_120px_rgba(0,0,0,0.55)]"
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
              />
              <span className="rounded-full border border-(--color-border) px-3 py-1 text-xs text-(--color-muted) hidden sm:flex">Enter</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
