import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //cacheComponents: true,
  compress: true,
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.chevronyeshiva.org",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Adjust as necessary
    },
    cssChunking: true,
    inlineCss: true,
  },
  // Add the custom headers configuration below
  async headers() {
    return [
      {
        // Apply these security headers to all routes in your application
        source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Permissions-Policy",
            // Fixed: "run-ad-auction" has been removed to resolve the unrecognized feature error
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
