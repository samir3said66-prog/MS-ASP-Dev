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
  build: {
    outDir: "dist",
    emptyOutDir: true,
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
        paths: {
          "node:*": "[name]",
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
  define: {
    "process.env.NODE_ENV": '"production"',
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
