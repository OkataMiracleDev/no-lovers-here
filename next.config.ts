import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sib-api-v3-sdk'],
  },
};

export default nextConfig;
