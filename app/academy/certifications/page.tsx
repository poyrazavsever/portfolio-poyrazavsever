import { AcademyHero } from "@/components/futures/academy/AcademyHero";
import { CertificationsList } from "@/components/futures/academy/CertificationsList";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function CertificationsPage() {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return (
    <div className="min-h-screen pb-24 bg-white">
      <AcademyHero dictionary={dictionary} />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <CertificationsList dictionary={dictionary} />
      </div>
    </div>
  );
}
