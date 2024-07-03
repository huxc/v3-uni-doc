import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/uni",
  optimizeDeps: {
    exclude: ["vitepress"],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [UnoCSS()],
});
