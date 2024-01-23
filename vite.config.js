import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

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
