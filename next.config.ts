import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return ["", "/en", "/it"].map(prefix => ({
      source: prefix + "/opengraph-image", destination: "/images/fms-social" + prefix.replace("/", "-") + ".png", permanent: true,
    }));
  },
  experimental: {
    inlineCss: true,
    globalNotFound: true,
  },
  images: {
    minimumCacheTTL: 2_678_400,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
