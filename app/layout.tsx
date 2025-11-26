import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import ActivityBar from "./components/layout/activitybar";
import Sidebar from "./components/layout/sidebar";
import { nunito } from "./font";
import { getAllPageMetadata } from "@/lib/mdx";
import type { PageMeta } from "@/lib/mdx";


export const metadata: Metadata = {
  title: "Poyraz Avsever - Portfolio - Freelancer - Fullstack Developer - Web Developer",
  description: "Poyraz Avsever's personal portfolio website showcasing projects, skills, and services as a freelancer and fullstack web developer. A young person passionate about coding and technology.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = await getAllPageMetadata();
  const blogPage: PageMeta = {
    slug: "blog",
    title: "My Blog Posts",
    order: Number.MAX_SAFE_INTEGER,
    tags: ["blog"],
    description: "All of my writing collected in one place.",
    links: [],
  };

  const blogLink = {
    label: blogPage.title,
    href: "/blog",
  };

  const sidebarLinks = pages.reduce<{ label: string; href: string }[]>((acc, page) => {
    acc.push({
      label: page.title,
      href: `/${page.slug}`,
    });

    if (page.slug === "about") {
      acc.push(blogLink);
    }

    return acc;
  }, []);

  if (!sidebarLinks.some((link) => link.href === blogLink.href)) {
    const contentIndex = sidebarLinks.findIndex((link) => link.href === "/content");
    const targetIndex = contentIndex >= 0 ? contentIndex : sidebarLinks.length;
    sidebarLinks.splice(targetIndex, 0, blogLink);
  }

  const searchablePages = [...pages, blogPage];

  return (
    <html lang="en" data-theme="mint" className={nunito.variable} suppressHydrationWarning>
      <body className="bg-(--color-background) text-(--color-text) antialiased">
        <ThemeProvider>
          <ActivityBar pages={searchablePages} />
          <Sidebar links={sidebarLinks} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
