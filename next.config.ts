import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@kindoms/shared-ui"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
