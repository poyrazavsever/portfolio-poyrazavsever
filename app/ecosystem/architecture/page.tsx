import { ArchitecturePageClient } from "./ArchitecturePageClient";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function ArchitecturePage() {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return <ArchitecturePageClient dictionary={dictionary} />;
}
