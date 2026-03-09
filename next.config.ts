import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Next.js typecheck step fails with spawn EPERM on this Windows environment.
    // We run `pnpm typecheck` separately in CI and local test flow.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
