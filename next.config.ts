import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //cacheComponents: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dovp7.sg-host.com",
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
