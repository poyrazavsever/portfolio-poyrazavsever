export type ActivityLink = {
  id: string;
  href: string;
  label: string;
  icon: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

export const ACTIVITY_LINKS: ActivityLink[] = [
  { id: "search", href: "/#search", label: "Search", icon: "solar:magnifer-line-duotone" },
  { id: "rss", href: "/rss.xml", label: "RSS Feed", icon: "solar:feed-bold-duotone" },
  { id: "resume", href: "/resume.pdf", label: "Resume", icon: "solar:inbox-archive-bold-duotone" },
  { id: "ui-kit", href: "https://ui.poyrazavsever.com", label: "My UI Kit", icon: "solar:colour-tuneing-bold-duotone" },
  { id: "status", href: "https://status.poyrazavsever.com", label: "Status", icon: "solar:chat-square-2-bold-duotone" },
  { id: "freelance", href: "https://freelance.poyrazavsever.com", label: "Freelance", icon: "solar:case-round-minimalistic-bold-duotone" },
] as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/poyrazavsever/", icon: "mdi:linkedin" },
  { id: "github", label: "GitHub", href: "https://github.com/poyrazavsever", icon: "mdi:github" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/poyraz_avsever", icon: "mdi:instagram" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com/@poyrazavsever", icon: "mdi:youtube" },
  { id: "medium", label: "Medium", href: "https://medium.com/@poyrazavsever", icon: "mdi:medium" },
  { id: "x", label: "X", href: "https://x.com/poyrazavsever", icon: "ri:twitter-x-fill" },
  { id: "behance", label: "Behance", href: "https://behance.net/poyrazavsever", icon: "mdi:behance" },
  { id: "coffee", label: "Buy Me a Coffee", href: "https://www.buymeacoffee.com/poyrazavsever", icon: "mdi:coffee-outline" },
] as const;
