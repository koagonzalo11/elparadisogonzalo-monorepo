import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        "fsevents",          // ⛔ macOS-only native module
        "node:fs/promises",  // ✅ avoid Termux issues
        "node:path",
        "node:process",
        "node:perf_hooks",
        "node:module"
      ]
    }
  }
});
