import { OpenSourceHero } from "@/components/futures/open-source/OpenSourceHero";
import { PackageCard } from "@/components/futures/open-source/PackageCard";
import { RepoCard } from "@/components/futures/open-source/RepoCard";
import { AllReposList } from "@/components/futures/open-source/AllReposList";

import { Typography, Separator } from "poyraz-ui/atoms";
import { fetchNPMPackages } from "@/lib/npm";
import { fetchGitHubRepos } from "@/lib/github";

import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

export const revalidate = 3600; // Revalidate every hour

export default async function OpenSourcePage() {
  const dictionary = await getDictionary(i18n.defaultLocale);
  const { showcaseOpenSource: os, showcaseCommon: common } = dictionary;

  const packages = await fetchNPMPackages();
  const { featured, all } = await fetchGitHubRepos();

  // Localize dynamic items if they match hardcoded ones in dictionary (optional, but good for main projects like poyraz-ui)
  const localizedPackages = packages.map((pkg) => {
    const localized = os.packages.find((p: any) => p.name === pkg.name);
    return localized ? { ...pkg, description: localized.description } : pkg;
  });

  const localizedFeatured = featured.map((repo) => {
    const localized = os.repositories.find((r: any) => r.name === repo.name);
    return localized ? { ...repo, description: localized.description } : repo;
  });

  return (
    <div className="min-h-screen pb-24">
      <OpenSourceHero
        title={os.hero.title}
        headerHighlight={os.hero.highlight}
        description={os.hero.description}
        badge={os.hero.badge}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24 space-y-20">
        {/* Packages Section */}
        <section>
          <div className="mb-8 flex items-center gap-4">
            <Typography
              variant="h2"
              className="text-2xl font-bold tracking-tight"
            >
              {common.labels.publishedPackages}
            </Typography>
            <Separator className="flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localizedPackages.length > 0 ? (
              localizedPackages.map((pkg) => (
                <PackageCard
                  key={pkg.name}
                  item={pkg}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 py-8">
                {common.labels.noItems}
              </div>
            )}
          </div>
        </section>

        {/* Featured Repositories Section */}
        <section>
          <div className="mb-8 flex items-center gap-4">
            <Typography
              variant="h2"
              className="text-2xl font-bold tracking-tight"
            >
              {common.labels.featuredRepos}
            </Typography>
            <Separator className="flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localizedFeatured.length > 0 ? (
              localizedFeatured.map((repo) => (
                <RepoCard key={repo.name} item={repo} />
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 py-8">
                {common.labels.noItems}
              </div>
            )}
          </div>
        </section>

        {/* All Repositories Section - Client Component with Pagination */}
        <AllReposList repos={all} dictionary={dictionary} />
      </div>
    </div>
  );
}
