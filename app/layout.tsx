import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import ActivityBar from "./components/layout/activitybar";
import Sidebar from "./components/layout/sidebar";
import { nunito } from "./font";
import { getAllPageMetadata } from "@/lib/mdx";


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
  const sidebarLinks = pages.map((page) => ({
    label: page.title,
    href: `/${page.slug}`,
  }));

  return (
    <html lang="en" data-theme="obsidian" className={nunito.variable} suppressHydrationWarning>
      <body className="bg-(--color-background) text-(--color-text) antialiased">
        <ThemeProvider>
          <ActivityBar />
          <Sidebar links={sidebarLinks} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
