import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.*"],
  output: "standalone",
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://analytics.mgck.ink",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/js/script.js",
        destination: "https://analytics.mgck.ink/js/script.js",
      },
      {
        source: "/ingest/api/event",
        destination: "https://analytics.mgck.ink/api/event",
      },
    ];
  },
};

export default nextConfig;
