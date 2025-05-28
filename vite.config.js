import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
      public: resolve(__dirname, "public"),
      assets: resolve(__dirname, "src/assets"),
      components: resolve(__dirname, "src/components"),
      pages: resolve(__dirname, "src/pages"),
      routes: resolve(__dirname, "src/routes"),
      store: resolve(__dirname, "src/store"),
      utils: resolve(__dirname, "src/utils"),
    },
  },
});
