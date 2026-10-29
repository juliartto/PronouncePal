import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera a versão estática em out/ no `npm run build` (exigência da Sprint 1)
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
