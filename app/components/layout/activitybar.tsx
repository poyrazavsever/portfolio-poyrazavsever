"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import SearchModal from "./search-modal";
import SettingsSheet from "./theme-sheet";
import Image from "next/image";

type NavItem = {
  id: string;
  href: string;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "search", href: "/#search", label: "Search", icon: "solar:magnifer-line-duotone" },
  { id: "rss", href: "/rss.xml", label: "RSS Feed", icon: "solar:feed-bold-duotone" },
  { id: "resume", href: "/resume.pdf", label: "Resume", icon: "solar:inbox-archive-bold-duotone" },
  { id: "ui-kit", href: "/#ui-kit", label: "My UI Kit", icon: "solar:colour-tuneing-bold-duotone" },
  { id: "status", href: "/#status", label: "Status", icon: "solar:chat-square-2-bold-duotone" },
  { id: "freelance", href: "/#freelance", label: "Freelance", icon: "solar:case-round-minimalistic-bold-duotone" },
] as const;

const SOCIAL_LINKS = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/poyrazavsever/", icon: "mdi:linkedin" },
  { id: "github", label: "GitHub", href: "https://github.com/poyrazavsever", icon: "mdi:github" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/poyrazavsever", icon: "mdi:instagram" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com/@poyrazavsever", icon: "mdi:youtube" },
  { id: "medium", label: "Medium", href: "https://medium.com/@poyrazavsever", icon: "mdi:medium" },
  { id: "x", label: "X", href: "https://x.com/poyrazavsever", icon: "ri:twitter-x-fill" },
  { id: "behance", label: "Behance", href: "https://behance.net/poyrazavsever", icon: "mdi:behance" },
  { id: "coffee", label: "Buy Me a Coffee", href: "https://www.buymeacoffee.com/poyrazavsever", icon: "mdi:coffee-outline" },
] as const;

const iconButtonBase =
  "relative flex h-12 w-12 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface)/90 text-(--color-muted) shadow-sm shadow-black/5 transition-colors hover:text-(--color-accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-background)";

const dropdownMotion = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 6, scale: 0.98 },
};

const tooltipMotion = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -6 },
};

const ActivityBar = () => {
  const [socialOpen, setSocialOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!socialOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSocialOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [socialOpen]);

  const handleHover = (id: string | null) => setHoveredId(id);

  useEffect(() => {
    if (!settingsOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);

  return (
    <>
      <aside className="fixed left-0 top-0 z-30 flex h-screen w-max flex-col justify-between gap-4 border-r border-(--color-border) bg-(--color-surface)/80 p-3 backdrop-blur-xl">
        <nav className="flex flex-col items-center gap-3">
          {NAV_ITEMS.map((item) => {
            const isExternal = item.href.startsWith("http");
            const isSearch = item.id === "search";

            return (
              <motion.div
                key={item.id}
                className="relative"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                {isSearch ? (
                  <button
                    type="button"
                    className={`${iconButtonBase} ${
                      searchOpen ? "text-(--color-accent)" : ""
                    }`}
                    aria-label="Search"
                    aria-haspopup="dialog"
                    aria-expanded={searchOpen}
                    onClick={() => setSearchOpen(true)}
                    onMouseEnter={() => handleHover(item.id)}
                    onMouseLeave={() => handleHover(null)}
                    onFocus={() => handleHover(item.id)}
                    onBlur={() => handleHover(null)}
                  >
                    <Icon icon={item.icon} className="text-[1.5rem]" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className={iconButtonBase}
                    aria-label={item.label}
                    title={item.label}
                    onMouseEnter={() => handleHover(item.id)}
                    onMouseLeave={() => handleHover(null)}
                    onFocus={() => handleHover(item.id)}
                    onBlur={() => handleHover(null)}
                  >
                    <Icon icon={item.icon} className="text-[1.5rem]" />
                  </Link>
                )}

                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.span
                      key={`${item.id}-tooltip`}
                      {...tooltipMotion}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium w-24 text-center text-(--color-text) shadow-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <motion.button
              type="button"
              className={`${iconButtonBase} ${
                socialOpen ? "text-(--color-accent)" : ""
              }`}
              aria-haspopup="true"
              aria-expanded={socialOpen}
              onClick={() => setSocialOpen((prev) => !prev)}
              onMouseEnter={() => handleHover("social")}
              onMouseLeave={() => handleHover(null)}
              onFocus={() => handleHover("social")}
              onBlur={() => handleHover(null)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              <Icon
                icon="solar:hashtag-square-bold-duotone"
                className="text-[1.5rem]"
              />
              <span className="sr-only">Social media links</span>
            </motion.button>

            <AnimatePresence>
              {hoveredId === "social" && !socialOpen && (
                <motion.span
                  key="social-tooltip"
                  {...tooltipMotion}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium w-24 text-center text-(--color-text) shadow-sm"
                >
                  Social Links
                </motion.span>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {socialOpen && (
                <motion.div
                  key="social-dropdown"
                  {...dropdownMotion}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-16 -top-14 z-10 min-w-[220px] -translate-y-1/2 rounded-2xl border border-(--color-border) bg-(--color-surface)/80 p-3 text-left shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur"
                >
                  <ul className="flex flex-col gap-1.5">
                    {SOCIAL_LINKS.map((social) => (
                      <li key={social.id}>
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          title={social.label}
                          className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-sm text-(--color-text) transition hover:bg-(--color-overlay)"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-(--color-background)/70">
                            <Icon
                              icon={social.icon}
                              className="text-lg text-(--color-accent)"
                            />
                          </span>
                          <span className="flex-1">{social.label}</span>
                          <Icon
                            icon="solar:arrow-right-up-linear"
                            className="text-base text-(--color-muted)"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              aria-label="Settings"
              className={`${iconButtonBase}`}
              onClick={() => setSettingsOpen(true)}
              onMouseEnter={() => handleHover("settings")}
              onMouseLeave={() => handleHover(null)}
              onFocus={() => handleHover("settings")}
              onBlur={() => handleHover(null)}
            >
              <Icon
                icon="solar:settings-bold-duotone"
                className="text-[1.5rem]"
              />
            </button>

            <div className="h-12 w-12 rounded-2xl border border-(--color-border) bg-(--color-background)/50 p-1">
              <Image
                src="/avatars/activitybar.jpeg"
                alt="Poyraz Avsever avatar"
                width={56}
                height={56}
                priority
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </aside>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <SettingsSheet
        open={settingsOpen}
        sheetRef={sheetRef}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default ActivityBar;
