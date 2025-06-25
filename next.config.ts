import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // Allow all HTTPS domains
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      // Allow all HTTP domains (including localhost)
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      // Specifically allow localhost with common ports
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "",
        pathname: "/**",
      },
    ],
    // Disable optimization for maximum compatibility
    unoptimized: true,
    // Allow any domain (fallback)
    domains: [],
  },
  experimental: {
    serverComponentsExternalPackages: ["cloudinary"],
  },
};

export default nextConfig;
