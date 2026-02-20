import "server-only";
import type { Locale } from "./i18n-config";
import type { Dictionary } from "./types/dictionary";

// Helper to load dictionary parts for a locale
const loadDictionary = async (locale: Locale): Promise<Dictionary> => {
  const [
    layout,
    shared,
    home,
    about,
    academy,
    career,
    contact,
    ecosystem,
    productsCommon,
    productsFigma,
    productsMobile,
    productsSaas,
    servicesCommon,
    servicesMain,
    servicesPricing,
    servicesWorkflow,
    showcaseCommon,
    showcasePortfolio,
    showcaseOpenSource,
    showcaseArchive,
    showcaseDesign,
    showcaseFullstack,
    mediaCommon,
    mediaBlog,
    mediaMasaBasi,
    mediaSocial,
    mediaYazilimaDair,
  ] = await Promise.all([
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
    import(`./dictionaries/${locale}/academy.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/career.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/contact.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/ecosystem.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/products-common.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/products-figma.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/products-mobile.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/products-saas.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/services-common.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/services-main.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/services-pricing.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/services-workflow.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/showcase-common.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/showcase-portfolio.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/showcase-open-source.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/showcase-archive.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/showcase-design.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/showcase-fullstack.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/media-common.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/media-blog.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/media-masa-basi.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/media-social.json`).then(
      (module) => module.default,
    ),
    import(`./dictionaries/${locale}/media-yazilima-dair.json`).then(
      (module) => module.default,
    ),
  ]);

  return {
    layout: layout.layout,
    shared,
    home,
    about,
    academy,
    career,
    contact,
    ecosystem,
    productsCommon,
    productsFigma,
    productsMobile,
    productsSaas,
    servicesCommon,
    servicesMain,
    servicesPricing,
    servicesWorkflow,
    showcaseCommon,
    showcasePortfolio,
    showcaseOpenSource,
    showcaseArchive,
    showcaseDesign,
    showcaseFullstack,
    mediaCommon,
    mediaBlog,
    mediaMasaBasi,
    mediaSocial,
    mediaYazilimaDair,
  } as Dictionary;
};

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => loadDictionary("en"),
  tr: () => loadDictionary("tr"),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  (await dictionaries[locale]?.()) ?? (await dictionaries.en());
