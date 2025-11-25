"use client";

import { createContext, useContext, useMemo, useState, useEffect, useRef } from "react";

export const APP_THEMES = [
  {
    id: "obsidian",
    label: "Obsidian Neon",
    description: "Saf siyah üzerine neon vurgular. Portföyün ana modu.",
    preview: {
      colors: ["#03060d", "#090f1c", "#7be9ff"],
      mood: "Dark",
    },
  },
  {
    id: "aurora",
    label: "Aurora",
    description: "Kuzey ışıklarından ilham alan yeşil ve deniz mavileri.",
    preview: {
      colors: ["#030812", "#0a1e29", "#47f2a2"],
      mood: "Neon",
    },
  },
  {
    id: "sunset",
    label: "Sunset",
    description: "Turuncu ve şarap tonlarının sıcak paleti.",
    preview: {
      colors: ["#120308", "#2b0d13", "#ff7a18"],
      mood: "Warm",
    },
  },
  {
    id: "oceanic",
    label: "Oceanic",
    description: "Derin deniz mavisi arka plan, buz mavisi aksan.",
    preview: {
      colors: ["#010a13", "#03213a", "#63b3ed"],
      mood: "Cool",
    },
  },
  {
    id: "forest",
    label: "Forest",
    description: "Doğa esintili, koyu yeşil yüzeyler ve pastel yeşil aksan.",
    preview: {
      colors: ["#030c07", "#0b2212", "#6ee7b7"],
      mood: "Calm",
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "Mor tabanlı gece teması, parlak lavanta dokunuşu.",
    preview: {
      colors: ["#050218", "#0d0a2f", "#c084fc"],
      mood: "Vivid",
    },
  },
  {
    id: "desert",
    label: "Desert",
    description: "Kızıl kahveler üzerinde altın sarısı enerji.",
    preview: {
      colors: ["#120b03", "#2c1507", "#fbbf24"],
      mood: "Bold",
    },
  },
  {
    id: "rose",
    label: "Rose Fuzz",
    description: "Fuşya temelli romantik bir görünüm.",
    preview: {
      colors: ["#14040e", "#370f21", "#ff4d8d"],
      mood: "Soft",
    },
  },
  {
    id: "nebula",
    label: "Nebula Pulse",
    description: "Mor ve uzay mavisiyle kozmik bir neon taban.",
    preview: {
      colors: ["#040214", "#110b2a", "#a855f7"],
      mood: "Mystic",
    },
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk Flux",
    description: "Parlak pembe lazerler ve koyu mor arka plan.",
    preview: {
      colors: ["#050013", "#160026", "#ff00bf"],
      mood: "Lazer",
    },
  },
  {
    id: "solstice",
    label: "Solstice Glow",
    description: "Sıcak krem tonları ve turuncu aksanlı bir gündüz teması.",
    preview: {
      colors: ["#fff7ee", "#fff0e1", "#ff914d"],
      mood: "Sunny",
    },
  },
  {
    id: "daybreak",
    label: "Daybreak Sky",
    description: "Serin maviler, pastel morlar ve net ışık modu.",
    preview: {
      colors: ["#f4f7ff", "#edf3ff", "#4f46e5"],
      mood: "Calm",
    },
  },
  {
    id: "glacier",
    label: "Glacier Mist",
    description: "Buzul beyazı yüzeyler ve cam mavisi aksan.",
    preview: {
      colors: ["#f9fdff", "#f1f8fb", "#0ea5e9"],
      mood: "Fresh",
    },
  },
  {
    id: "mint",
    label: "Mint Cream",
    description: "Pastel yeşil taban ve tropical aksanlı hafif bir ışık modu.",
    preview: {
      colors: ["#f1fff6", "#e5fbec", "#2dd4bf"],
      mood: "Fresh",
    },
  },
  {
    id: "mono",
    label: "Mono Light",
    description: "Minimum beyaz/siyah kontrastlı ışık modu.",
    preview: {
      colors: ["#fcfcfc", "#e7e7ea", "#18181b"],
      mood: "Light",
    },
  },
] as const;

export type ThemeId = (typeof APP_THEMES)[number]["id"];
const DEFAULT_THEME: ThemeId = "mint";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio.theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const isFirstPaint = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    const root = document.documentElement;
    if (stored && APP_THEMES.some((item) => item.id === stored)) {
      root.dataset.theme = stored;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate React state with persisted preference after mount
      setTheme(stored);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, DEFAULT_THEME);
    root.dataset.theme = DEFAULT_THEME;
  }, []);

  useEffect(() => {
    if (isFirstPaint.current) {
      isFirstPaint.current = false;
      return;
    }

    const root = document.documentElement;
    root.dataset.theme = theme;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
