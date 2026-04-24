import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL
  ? new URL(process.env.STRAPI_URL)
  : null;

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: strapiUrl
    ? {
        remotePatterns: [
          {
            protocol: strapiUrl.protocol.replace(':', '') as 'http' | 'https',
            hostname: strapiUrl.hostname,
            port: strapiUrl.port || undefined,
            pathname: '/**',
          },
        ],
      }
    : undefined,
};

export default nextConfig;
