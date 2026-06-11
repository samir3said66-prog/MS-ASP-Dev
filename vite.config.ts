import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackStartVitePlugin } from "@tanstack/react-start/vite";
import tailwindPlugin from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    TanStackStartVitePlugin(),
    react(),
    tsconfigPaths(),
    tailwindPlugin(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  ssr: {
    external: ["react", "react-dom"],
  },
});
