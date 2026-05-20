import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
