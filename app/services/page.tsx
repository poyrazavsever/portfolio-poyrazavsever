import { ServicesHero } from "@/components/futures/services/ServicesHero";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import { ServicesListClient } from "./ServicesListClient";
import { Service } from "@/components/futures/services/ServiceCard";

export default async function ServicesPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);
  const { servicesCommon: common, servicesMain: main } = dictionary;

  // Use localized services from main dictionary
  const localizedServices: Service[] = main.services.map((s) => ({
    ...s,
    tags: [s.category, ...s.features], // Mapping for existing search logic compatibility if needed
  }));

  return (
    <div className="min-h-screen pb-24 bg-white">
      <ServicesHero
        title={common.hero.title}
        highlight={common.hero.highlight}
        description={common.hero.description}
      />

      <ServicesListClient
        services={localizedServices}
        dictionary={dictionary}
      />
    </div>
  );
}
