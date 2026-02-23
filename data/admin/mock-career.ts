import { AdminCareerItem } from "@/types/admin";

export const mockCareerItems: AdminCareerItem[] = [
  // Work Experience
  {
    id: "c1",
    type: "work",
    role_tr: "Senior Frontend Developer",
    role_en: "Senior Frontend Developer",
    company_tr: "Teknoloji A.Ş.",
    company_en: "Tech Corp",
    location_tr: "İstanbul, Türkiye",
    location_en: "Istanbul, Turkey",
    date_tr: "Haziran 2021 - Günümüz",
    date_en: "June 2021 - Present",
    employment_type_tr: "Tam Zamanlı",
    employment_type_en: "Full-time",
    description_tr: [
      "Next.js ve TypeScript kullanarak ölçeklenebilir web uygulamaları geliştirildi.",
      "UI kit kütüphanesinin tasarımı ve implementasyonu yönetildi.",
      "Performans optimizasyonları ile yükleme süreleri %40 iyileştirildi.",
    ],
    description_en: [
      "Developed scalable web applications using Next.js and TypeScript.",
      "Managed the design and implementation of the UI kit library.",
      "Improved load times by 40% through performance optimizations.",
    ],
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Architecture"],
    sort_order: 1,
    is_published: true,
    created_at: "2021-06-01T10:00:00Z",
  },
  {
    id: "c2",
    type: "work",
    role_tr: "Frontend Developer",
    role_en: "Frontend Developer",
    company_tr: "Yazılım Evi",
    company_en: "Software House",
    location_tr: "Ankara, Türkiye (Uzaktan)",
    location_en: "Ankara, Turkey (Remote)",
    date_tr: "Ocak 2019 - Mayıs 2021",
    date_en: "January 2019 - May 2021",
    employment_type_tr: "Tam Zamanlı",
    employment_type_en: "Full-time",
    description_tr: [
      "React ve Redux kullanarak karmaşık dashboard panelleri hazırlandı.",
      "RESTful API entegrasyonları yapıldı.",
    ],
    description_en: [
      "Prepared complex dashboard panels using React and Redux.",
      "Performed RESTful API integrations.",
    ],
    skills: ["React", "Redux", "JavaScript", "REST API"],
    sort_order: 2,
    is_published: true,
    created_at: "2019-01-01T10:00:00Z",
  },

  // Volunteer
  {
    id: "c3",
    type: "volunteer",
    role_tr: "Açık Kaynak Katılımcısı",
    role_en: "Open Source Contributor",
    company_tr: "Çeşitli Projeler",
    company_en: "Various Projects",
    date_tr: "2018 - Günümüz",
    date_en: "2018 - Present",
    description_tr: [
      "Popüler React kütüphanelerine bug fix ve feature eklentileri yapıldı.",
    ],
    description_en: [
      "Made bug fixes and feature additions to popular React libraries.",
    ],
    skills: ["Open Source", "Git", "Community"],
    sort_order: 1,
    is_published: true,
    created_at: "2018-01-01T10:00:00Z",
  },

  // Education
  {
    id: "c4",
    type: "education",
    role_tr: "Bilgisayar Mühendisliği",
    role_en: "Computer Engineering",
    company_tr: "Örnek Üniversitesi",
    company_en: "Example University",
    location_tr: "İstanbul, Türkiye",
    location_en: "Istanbul, Turkey",
    date_tr: "2014 - 2018",
    date_en: "2014 - 2018",
    employment_type_tr: "Lisans",
    employment_type_en: "Bachelor's Degree",
    description_tr: [
      "Yüksek onur derecesi ile mezun olundu.",
      "Bitirme projesi olarak 'Yapay Zeka Destekli Web Analitiği' geliştirildi.",
    ],
    description_en: [
      "Graduated with high honors.",
      "Developed 'AI Managed Web Analytics' as a graduation project.",
    ],
    sort_order: 1,
    is_published: true,
    created_at: "2014-09-01T10:00:00Z",
  },
];
