import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //cacheComponents: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://dovp7.sg-host.com/**")],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Adjust as necessary
    },
  },
};

export default nextConfig;
