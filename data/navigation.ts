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

export type SidebarLink = {
  label: string;
  href: string;
};

export const ACTIVITY_LINKS: ActivityLink[] = [
  { id: "search", href: "/#search", label: "Search", icon: "solar:magnifer-line-duotone" },
  { id: "rss", href: "/rss.xml", label: "RSS Feed", icon: "solar:feed-bold-duotone" },
  { id: "resume", href: "/resume.pdf", label: "Resume", icon: "solar:inbox-archive-bold-duotone" },
  { id: "ui-kit", href: "/#ui-kit", label: "My UI Kit", icon: "solar:colour-tuneing-bold-duotone" },
  { id: "status", href: "/#status", label: "Status", icon: "solar:chat-square-2-bold-duotone" },
  { id: "freelance", href: "/#freelance", label: "Freelance", icon: "solar:case-round-minimalistic-bold-duotone" },
] as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/poyrazavsever/", icon: "mdi:linkedin" },
  { id: "github", label: "GitHub", href: "https://github.com/poyrazavsever", icon: "mdi:github" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/poyrazavsever", icon: "mdi:instagram" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com/@poyrazavsever", icon: "mdi:youtube" },
  { id: "medium", label: "Medium", href: "https://medium.com/@poyrazavsever", icon: "mdi:medium" },
  { id: "x", label: "X", href: "https://x.com/poyrazavsever", icon: "ri:twitter-x-fill" },
  { id: "behance", label: "Behance", href: "https://behance.net/poyrazavsever", icon: "mdi:behance" },
  { id: "coffee", label: "Buy Me a Coffee", href: "https://www.buymeacoffee.com/poyrazavsever", icon: "mdi:coffee-outline" },
] as const;

export const SIDEBAR_LINKS: SidebarLink[] = [
  { label: "Overview", href: "/overview" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const;
