import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "public.blob.vercel-storage.com",
      },
    ],
  },
  // Allow 127.0.0.1 and local hostnames in development to prevent cross-origin resource chunk issues
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.15.1", "127.0.0.1:3000", "localhost:3000"],
  webpack: (config, { dev }) => {
    if (dev) {
      // Increase chunk loading timeout for Windows file systems to prevent ChunkLoadError timeouts
      config.output = {
        ...config.output,
        chunkLoadTimeout: 120000,
      };
    }
    return config;
  },
};

export default nextConfig;
