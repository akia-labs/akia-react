import dts from 'vite-plugin-dts';
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [dts({ outDir: "dist", entryRoot: "src" })],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    }
  }
});