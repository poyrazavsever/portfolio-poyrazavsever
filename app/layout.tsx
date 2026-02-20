import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "poyraz-ui";
import { Toaster } from "poyraz-ui/molecules";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title:
    "Poyraz Avsever - Portfolio - Freelancer - Fullstack Developer - Web Developer",
  description:
    "Poyraz Avsever's personal portfolio website showcasing projects, skills, and services as a freelancer and fullstack web developer. A young person passionate about coding and technology.",
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "Poyraz Avsever" }],
  keywords: [
    "Poyraz Avsever",
    "Portfolio",
    "Freelancer",
    "Fullstack Developer",
    "Web Developer",
    "Projects",
    "Skills",
    "Services",
    "Coding",
    "Technology",
    "Personal Website",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "React",
    "Node.js",
    "Next.js",
    "Web Development",
    "Programming",
    "Tech Enthusiast",
    "Developer Portfolio",
  ],
};

import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dictionary = await getDictionary(i18n.defaultLocale);

  return (
    <html lang={i18n.defaultLocale}>
      <body>
        <TooltipProvider>
          <SiteNavbar dictionary={dictionary} />
          <main className="min-h-screen">{children}</main>
          <SiteFooter dictionary={dictionary} />
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
