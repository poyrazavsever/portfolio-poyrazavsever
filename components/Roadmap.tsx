"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useSyncExternalStore,
} from "react";
import { Icon } from "@iconify/react";

// Context to share week title with Day components for unique storage keys
const WeekContext = createContext<string>("");
const roadmapStorageEvent = "roadmap-storage-change";

function subscribeRoadmapState(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(roadmapStorageEvent, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(roadmapStorageEvent, handleChange);
  };
}

function readRoadmapState(storageKey: string) {
  if (typeof window === "undefined") {
    return false;
  }

  const saved = localStorage.getItem(storageKey);
  if (!saved) {
    return false;
  }

  try {
    return JSON.parse(saved) === true;
  } catch {
    return false;
  }
}

export function Roadmap({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto print:max-w-none">
      {children}
    </div>
  );
}

export function RoadmapHeader() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-linear-to-r from-(--color-surface) to-(--color-background) p-6 rounded-2xl border border-(--color-border) print:hidden">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-tr from-purple-500 to-pink-500 text-white shadow-lg">
          <Icon icon="mdi:instagram" width="28" height="28" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-(--color-text)">
            Instagram Serisi
          </h2>
          <p className="text-sm text-(--color-muted)">
            Bu yol haritası bir sosyal medya içeriği olarak hazırlanmıştır.
          </p>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-(--color-accent)/10 hover:bg-(--color-accent)/20 text-(--color-accent) border border-(--color-accent)/20 transition-all font-medium cursor-pointer"
      >
        <Icon icon="solar:file-download-bold" width="20" height="20" />
        PDF İndir
      </button>
    </div>
  );
}

export function Day({
  day,
  children,
}: {
  day: string;
  children: React.ReactNode;
}) {
  const weekTitle = useContext(WeekContext);

  // Generate unique key combining week title and day
  // Clean up strings to make them safe for keys
  const safeWeek = weekTitle.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  const safeDay = day.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  const storageKey = `roadmap-check-${safeWeek}-${safeDay}`;
  const isChecked = useSyncExternalStore(
    subscribeRoadmapState,
    () => readRoadmapState(storageKey),
    () => false,
  );

  const toggleCheck = () => {
    const newState = !isChecked;
    localStorage.setItem(storageKey, JSON.stringify(newState));
    window.dispatchEvent(new Event(roadmapStorageEvent));
  };

  return (
    <div
      onClick={toggleCheck}
      className={`
        flex gap-4 p-3 rounded-xl border transition-all cursor-pointer group
        ${
          isChecked
            ? "bg-(--color-accent)/5 border-(--color-accent)/20"
            : "border-transparent hover:bg-(--color-surface)"
        }
      `}
    >
      <div
        className={`
          shrink-0 mt-1 flex items-center justify-center w-6 h-6 rounded-md border transition-all
          ${
            isChecked
              ? "bg-(--color-accent) border-(--color-accent) text-(--color-accent-contrast)"
              : "border-(--color-muted) bg-(--color-background) group-hover:border-(--color-accent)"
          }
        `}
      >
        {isChecked && (
          <Icon icon="solar:check-read-bold" width="16" height="16" />
        )}
      </div>
      <div
        className={`${isChecked ? "opacity-50 line-through decoration-(--color-border)" : "text-(--color-text)"} transition-all`}
      >
        <span className="font-semibold text-(--color-accent) mr-2">{day}:</span>
        <span className="text-(--color-muted)">{children}</span>
      </div>
    </div>
  );
}

export function Week({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand for print
  useEffect(() => {
    const mediaQuery = window.matchMedia("print");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(true);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <WeekContext.Provider value={title}>
      <div
        className={`
          group relative overflow-hidden rounded-2xl border transition-all duration-300 break-inside-avoid print:border-black print:mb-4
          ${
            isOpen
              ? "bg-(--color-surface) border-(--color-accent) shadow-(--shadow-glow) print:shadow-none"
              : "bg-(--color-surface)/50 border-(--color-border) hover:border-(--color-accent)/50 hover:bg-(--color-surface)"
          }
        `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-6 py-4 text-left outline-none print:hidden"
        >
          <h3
            className={`text-lg font-medium transition-colors ${isOpen ? "text-(--color-accent)" : "text-(--color-text)"}`}
          >
            {title}
          </h3>
          <span
            className={`
              flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border)
              bg-(--color-background) transition-all duration-300
              ${isOpen ? "rotate-180 border-(--color-accent) text-(--color-accent)" : "text-(--color-muted) group-hover:border-(--color-accent)/50 group-hover:text-(--color-accent)"}
            `}
          >
            <Icon icon="solar:alt-arrow-down-linear" width="20" height="20" />
          </span>
        </button>

        {/* Print-only title */}
        <h3 className="hidden print:block text-xl font-bold px-6 py-2 border-b border-black">
          {title}
        </h3>

        <div className={isOpen ? "block" : "hidden print:block"}>
          <div className="border-t border-(--color-border)/30 px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-1">{children}</div>
          </div>
        </div>
      </div>
    </WeekContext.Provider>
  );
}
