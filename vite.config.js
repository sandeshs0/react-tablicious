import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/index.js", // Entry file for the library
      name: "ReactTablicious",
      fileName: (format) => `index.${format}.js`, // Generates ESM and CJS files
      formats: ["es", "cjs"], // ESM and CJS output
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Mark peer dependencies as external
    },
  },
});
