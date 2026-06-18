import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindPlugin from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindPlugin(),
    {
      name: "externalize-node-modules",
      resolveId(id) {
        if (id.startsWith("node:")) {
          return { id, external: true };
        }
      },
    },
  ],

  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Raise the warning limit — Three.js + Framer Motion are inherently large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: "index.html",
      external: [
        "node:async_hooks",
        "node:stream",
        "node:util",
        "node:events",
        "node:path",
        "node:fs",
      ],
      output: {
        paths: { "node:*": "[name]" },
        // Manual vendor chunk splitting — separate only the two heaviest libs
        // (three.js ~730 kB, framer-motion ~32 kB) so users can cache them
        // independently. Everything else (react, tanstack, lucide, etc.) stays
        // in one "vendor" chunk to avoid circular-dependency warnings.
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "vendor-three";
          if (id.includes("node_modules/framer-motion")) return "vendor-framer";
          if (id.includes("node_modules/")) return "vendor";
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  optimizeDeps: {
    exclude: ["@tanstack/start-storage-context"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});
