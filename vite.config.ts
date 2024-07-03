import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/v3-uni-doc",
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
