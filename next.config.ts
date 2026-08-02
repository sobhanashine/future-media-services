import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    inlineCss: true,
  },
  images: {
    minimumCacheTTL: 2_678_400,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
