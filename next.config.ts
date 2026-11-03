import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Resizing is done by ImageKit via a custom loader, so Vercel Image Optimization
    // (and its usage quota) is not used. See src/lib/image-loader.ts.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  outputFileTracingIncludes: {
    "/docs": ["./node_modules/swagger-ui-dist/**/*"],
    "/docs/assets/[file]": ["./node_modules/swagger-ui-dist/**/*"],
  },
};

export default nextConfig;
