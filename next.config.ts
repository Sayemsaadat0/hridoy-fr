import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only optimize images from our ImageKit account; an open "**" pattern would let
    // anyone use this server as a free image proxy.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/docs": ["./node_modules/swagger-ui-dist/**/*"],
    "/docs/assets/[file]": ["./node_modules/swagger-ui-dist/**/*"],
  },
};

export default nextConfig;
