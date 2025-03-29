import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  },
  plugins: [
    react(),
    eslint({
      cache: false, // Desactiva caché, para ver todos los errores siempre
      fix: false,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
