import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "/translanguaging-encyclopedia/",
  plugins: [react()],
  build: {
    outDir: "pages-dist",
    emptyOutDir: true,
    rollupOptions: { input: { main: resolve(__dirname, "index.html"), reading:resolve(__dirname,"reading.html"), workspace:resolve(__dirname,"workspace.html"), handbook: resolve(__dirname, "handbook.html"), sociolinguistics: resolve(__dirname,"sociolinguistics.html"), applied: resolve(__dirname,"applied-linguistics.html"), genai: resolve(__dirname,"genai-language-education.html") } },
  },
});
