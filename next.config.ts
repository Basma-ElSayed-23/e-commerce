import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental:{
    nodeMiddleware: true,
  },
};

export default nextConfig;
