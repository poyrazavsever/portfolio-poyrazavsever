import { cookies } from "next/headers";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import { AcademyHero } from "@/components/futures/academy/AcademyHero";
import { AcademySlidesClient } from "@/components/futures/academy/AcademySlidesClient";
import fs from "fs";
import path from "path";

export default async function AcademyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    i18n.defaultLocale) as Locale;
  const dictionary = await getDictionary(locale);

  // Read PDF files from public/pdf
  const pdfDir = path.join(process.cwd(), "public", "pdf");
  let pdfFiles: string[] = [];

  try {
    if (fs.existsSync(pdfDir)) {
      pdfFiles = fs
        .readdirSync(pdfDir)
        .filter((file) => file.endsWith(".pdf"))
        .sort();
    }
  } catch (error) {
    console.error("Error reading PDF directory:", error);
  }

  return (
    <div className="min-h-screen pb-24 bg-white">
      <AcademyHero dictionary={dictionary} />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <AcademySlidesClient dictionary={dictionary} pdfFiles={pdfFiles} />
      </div>
    </div>
  );
}
