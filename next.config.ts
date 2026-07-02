import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //cacheComponents: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [new URL("https://dovp7.sg-host.com/**")],
  },
  experimental: {
    largePageDataBytes: 200 * 1000, // Set threshold to 200 kB
  },
};

export default nextConfig;
