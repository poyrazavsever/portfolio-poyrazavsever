import { RepoItem } from "@/data/open-source-data";

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

const FEATURED_REPOS = [
  "portfolio-obsidian",
  "poyraz-ui",
  "nestjs-easy-log",
  "go-microservice-template",
  "react-native-brutal",
  "rust-cli-tools",
];

export async function fetchGitHubRepos(): Promise<{
  featured: RepoItem[];
  all: RepoItem[];
}> {
  try {
    // Fetch all public repos
    const res = await fetch(
      "https://api.github.com/users/poyrazavsever/repos?sort=updated&per_page=100",
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      console.error("Failed to fetch GitHub repos");
      return { featured: [], all: [] };
    }

    const repos: GitHubRepo[] = await res.json();

    const formattedRepos: RepoItem[] = repos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || "Unknown",
      url: repo.html_url,
    }));

    const featured = formattedRepos.filter((repo) =>
      FEATURED_REPOS.includes(repo.name),
    );

    // Sort by stars descending
    const all = formattedRepos.sort((a, b) => b.stars - a.stars);

    return { featured, all };
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return { featured: [], all: [] };
  }
}
