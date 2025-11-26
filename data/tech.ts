export type TechCategory = "frontend" | "language" | "backend" | "database" | "tool" | "platform";

export type TechStackItem = {
  iconName: string;
  category: TechCategory;
  title: string;
};

export const tech: TechStackItem[] = [
  // Frontend
  { iconName: "html", category: "frontend", title: "HTML5" },
  { iconName: "css", category: "frontend", title: "CSS3" },
  { iconName: "sass", category: "frontend", title: "SASS" },
  { iconName: "tailwind", category: "frontend", title: "Tailwind CSS" },
  { iconName: "bootstrap", category: "frontend", title: "Bootstrap" },
  { iconName: "materialui", category: "frontend", title: "Material UI" },
  { iconName: "react", category: "frontend", title: "React" },
  { iconName: "react", category: "frontend", title: "React Native" },
  { iconName: "electron", category: "frontend", title: "Electron" },
  { iconName: "nextjs", category: "frontend", title: "Next.js" },
  { iconName: "vue", category: "frontend", title: "Vue.js" },
  { iconName: "nuxtjs", category: "frontend", title: "Nuxt.js" },
  { iconName: "svelte", category: "frontend", title: "Svelte" },
  { iconName: "redux", category: "frontend", title: "Redux" },
  { iconName: "pug", category: "frontend", title: "Pug" },

  // Language
  { iconName: "js", category: "language", title: "JavaScript" },
  { iconName: "ts", category: "language", title: "TypeScript" },
  { iconName: "python", category: "language", title: "Python" },

  // Backend & Databases
  { iconName: "nodejs", category: "backend", title: "Node.js" },
  { iconName: "express", category: "backend", title: "Express.js" },
  { iconName: "nestjs", category: "backend", title: "Nest.js" },
  { iconName: "fastapi", category: "backend", title: "FastAPI" },
  { iconName: "flask", category: "backend", title: "Flask" },
  { iconName: "firebase", category: "database", title: "Firebase" },
  { iconName: "supabase", category: "database", title: "Supabase" },
  { iconName: "sqlite", category: "database", title: "SQLite" },
  { iconName: "mysql", category: "database", title: "MySQL" },
  { iconName: "mongodb", category: "database", title: "MongoDB" },

  // Tools & Platforms
  { iconName: "figma", category: "tool", title: "Figma" },
  { iconName: "xd", category: "tool", title: "Adobe XD" },
  { iconName: "ps", category: "tool", title: "Photoshop" },
  { iconName: "sketchup", category: "tool", title: "SketchUp" },
  { iconName: "stackoverflow", category: "tool", title: "Stackoverflow" },
  { iconName: "markdown", category: "tool", title: "Markdown" },
  { iconName: "notion", category: "tool", title: "Notion" },
  { iconName: "discord", category: "tool", title: "Discord" },
  { iconName: "linux", category: "tool", title: "Linux - ZorinOS" },
  { iconName: "jenkins", category: "tool", title: "Jenkins" },
  { iconName: "vercel", category: "platform", title: "Vercel" },
  { iconName: "git", category: "tool", title: "Git" },
  { iconName: "gitlab", category: "tool", title: "GitLab" },
  { iconName: "github", category: "tool", title: "GitHub" },
  { iconName: "vscode", category: "tool", title: "VS Code" },
  { iconName: "visualstudio", category: "tool", title: "Visual Studio" },
];
