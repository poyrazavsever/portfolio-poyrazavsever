import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import ActivityBar from "./components/layout/activitybar";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="obsidian" suppressHydrationWarning>
      <body className="bg-(--color-background) text-(--color-text) antialiased">
        <ThemeProvider>
          <ActivityBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
