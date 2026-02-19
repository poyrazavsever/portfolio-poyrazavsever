import { PackageItem } from "@/data/open-source-data";

interface NpmPackage {
  package: {
    name: string;
    description: string;
    version: string;
    links: {
      npm: string;
    };
  };
}

interface NpmResponse {
  objects: NpmPackage[];
}

export async function fetchNPMPackages(): Promise<PackageItem[]> {
  try {
    const res = await fetch(
      "https://registry.npmjs.org/-/v1/search?text=maintainer:poyrazavsever",
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      console.error("Failed to fetch NPM packages");
      return [];
    }

    const data: NpmResponse = await res.json();

    return data.objects.map((obj) => ({
      name: obj.package.name,
      description: obj.package.description,
      installCommand: `npm install ${obj.package.name}`,
      downloads: "0",
      version: obj.package.version,
      type: "npm",
      url: obj.package.links.npm,
    }));
  } catch (error) {
    console.error("Error fetching NPM packages:", error);
    return [];
  }
}
