import { cookies } from "next/headers";
import { ArchitecturePageClient } from "./ArchitecturePageClient";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function ArchitecturePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || i18n.defaultLocale) as any;
  const dictionary = await getDictionary(locale);

  return <ArchitecturePageClient dictionary={dictionary} />;
}
