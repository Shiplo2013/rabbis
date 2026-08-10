import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //cacheComponents: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.chevronyeshiva.org",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Adjust as necessary
    },
  },
};

export default nextConfig;
