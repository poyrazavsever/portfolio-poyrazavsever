import "server-only";
import type { Locale } from "./i18n-config";
import type { Dictionary } from "./types/dictionary";

// Helper to load dictionary parts for a locale
const loadDictionary = async (locale: Locale): Promise<Dictionary> => {
  const [layout, shared, home, about] = await Promise.all([
    import(`./dictionaries/${locale}/layout.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/shared.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/home.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/about.json`).then(
      (module) => module.default,
    ),
  ]);

  return {
    layout: layout.layout,
    shared,
    home,
    about,
  } as Dictionary;
};

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => loadDictionary("en"),
  tr: () => loadDictionary("tr"),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en();
