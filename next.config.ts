import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The site is now a single page. Old routes point at their section so shared links still land.
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/services", destination: "/#contact", permanent: true },
      { source: "/process", destination: "/#work", permanent: true },
    ];
  },
};

export default nextConfig;
