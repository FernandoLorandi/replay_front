import type { NextConfig } from 'next';

const strapiUrl = process.env.STRAPI_URL
  ? new URL(process.env.STRAPI_URL)
  : null;

const allowLocalIpImages = process.env.NEXT_IMAGE_ALLOW_LOCAL_IP === 'true';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: strapiUrl
    ? {
        dangerouslyAllowLocalIP: allowLocalIpImages,
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
