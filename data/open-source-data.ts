export interface PackageItem {
  name: string;
  description: string;
  installCommand: string;
  downloads: string;
  version: string;
  type: "npm" | "nuget";
  url: string;
}

export interface RepoItem {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export const openSourcePageData = {
  title: "Open Source",
  headerHighlight: "Contributions",
  description:
    "Libraries, tools, and experiments shared with the community. Believing in the power of open collaboration.",
};

export const packages: PackageItem[] = [
  {
    name: "poyraz-ui",
    description:
      "A brutalist, accessibility-first React component library built on top of Radix UI and Tailwind CSS.",
    installCommand: "npm install poyraz-ui",
    downloads: "12k+",
    version: "1.0.4",
    type: "npm",
    url: "https://www.npmjs.com/package/poyraz-ui",
  },
  {
    name: "nestjs-easy-log",
    description:
      "Zero-config structured logging module for NestJS applications with support for multiple transports.",
    installCommand: "npm install nestjs-easy-log",
    downloads: "5.4k",
    version: "2.1.0",
    type: "npm",
    url: "https://www.npmjs.com/package/nestjs-easy-log",
  },
  {
    name: "Poyraz.Extensions",
    description:
      "Common extension methods and utilities for .NET 8+ applications to boost productivity.",
    installCommand: "dotnet add package Poyraz.Extensions",
    downloads: "8.2k",
    version: "3.0.1",
    type: "nuget",
    url: "https://www.nuget.org/packages/Poyraz.Extensions",
  },
];

export const repositories: RepoItem[] = [
  {
    name: "portfolio-obsidian",
    description:
      "The source code for this very portfolio. Built with Next.js 14, Tailwind CSS, and Framer Motion.",
    stars: 124,
    forks: 32,
    language: "TypeScript",
    url: "https://github.com/poyrazavsever/portfolio-obsidian",
  },
  {
    name: "go-microservice-template",
    description:
      "A production-ready Go microservice template with gRPC, REST, Swagger, and Docker support.",
    stars: 89,
    forks: 15,
    language: "Go",
    url: "https://github.com/poyrazavsever/go-microservice-template",
  },
  {
    name: "react-native-brutal",
    description:
      "Experimental brutalist UI components for React Native. Sharp edges, bold typography.",
    stars: 45,
    forks: 8,
    language: "TypeScript",
    url: "https://github.com/poyrazavsever/react-native-brutal",
  },
  {
    name: "rust-cli-tools",
    description:
      "A collection of CLI tools written in Rust for daily developer tasks and file manipulation.",
    stars: 210,
    forks: 12,
    language: "Rust",
    url: "https://github.com/poyrazavsever/rust-cli-tools",
  },
];
