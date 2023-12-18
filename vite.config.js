import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      components: "/src/components",
      features: "/src/features",
      routes: "/src/routes",
      assets: "/src/assets",
    },
  },
})
