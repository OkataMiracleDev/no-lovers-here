import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      'model/UploadImageToGallery': false,
    },
  },
  webpack: (config) => {
    // Fix for sib-api-v3-sdk module resolution issues
    config.resolve.alias = {
      ...config.resolve.alias,
      'model/UploadImageToGallery': false,
    };
    return config;
  },
};

export default nextConfig;
