"use client";

import { APP_THEMES, useTheme } from "@/components/theme-provider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {APP_THEMES.map(({ id, label, description, preview }) => {
        const isActive = theme === id;

        const activeStyles = isActive ? { boxShadow: "var(--shadow-glow)" } : undefined;

        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => setTheme(id)}
            className={`group relative overflow-hidden rounded-2xl border bg-[var(--color-surface)] px-4 py-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
              isActive
                ? "border-[var(--color-accent)]"
                : "border-[var(--color-border)] hover:-translate-y-0.5"
            }`}
            style={activeStyles}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold leading-tight text-[var(--color-text)]">{label}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{description}</p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-muted)]">
                {preview.mood}
              </span>
            </div>

            <div className="mt-4 flex gap-1.5">
              {preview.colors.map((color) => (
                <span
                  key={`${id}-${color}`}
                  className="h-2.5 flex-1 rounded-full"
                  style={{ background: color }}
                />
              ))}
            </div>

            {isActive ? (
              <span className="absolute inset-x-4 bottom-3 inline-flex items-center gap-2 text-xs font-medium text-[var(--color-accent)]">
                <span className="inline-flex h-2 w-2 items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                </span>
                Aktif tema
              </span>
            ) : (
              <span className="pointer-events-none absolute inset-x-4 bottom-3 text-xs text-[var(--color-muted)] opacity-70">
                Tıkla ve uygula
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
