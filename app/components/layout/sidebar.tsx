"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const NAV_LINKS = [
  { label: "Overview", href: "/overview" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Sidebar() {
  const [query, setQuery] = useState("");

  const filteredLinks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return NAV_LINKS;
    }
    return NAV_LINKS.filter((item) => item.label.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <aside className="fixed left-[calc(60px+0.75rem)] top-0 z-20 hidden h-screen w-64 flex-col border-r border-(--color-border) bg-(--color-surface)/85 p-5 backdrop-blur-xl lg:flex">
      <div>
        <label htmlFor="sidebar-search" className="text-xs font-semibold text-(--color-muted)">
          Explorer
        </label>
        <input
          id="sidebar-search"
          type="search"
          placeholder="Search links..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mt-2 w-full rounded-xl border border-(--color-border) bg-(--color-background)/50 px-3 py-2 text-sm text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
        />
      </div>

      <nav className="mt-6 flex-1 overflow-y-auto">
        <ul className="space-y-2 text-sm text-(--color-muted)">
          {filteredLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-2 text-(--color-text) transition hover:bg-(--color-overlay) hover:text-(--color-text)"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {filteredLinks.length === 0 && <li className="px-3 py-2 text-xs text-(--color-muted)">No results</li>}
        </ul>
      </nav>
    </aside>
  );
}
