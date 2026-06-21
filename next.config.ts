import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  serverExternalPackages: [
    "pino", "pino-pretty"
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
