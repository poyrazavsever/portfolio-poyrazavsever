import { AcademyHero } from "@/components/futures/academy/AcademyHero";
import { CertificationsList } from "@/components/futures/academy/CertificationsList";

export default function CertificationsPage() {
  return (
    <div className="min-h-screen pb-24 bg-white">
      <AcademyHero
        title="My"
        headerHighlight="Certifications"
        description="Formal recognition of my technical skills and continuous learning journey."
        badge="Certifications"
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <CertificationsList />
      </div>
    </div>
  );
}
