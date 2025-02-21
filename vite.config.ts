import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "portfolio_mfe",
      remotes: {
        htmx_mfe: "htmx_mfe@http://localhost:3001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext", // Ensures top-level await is supported
  },
  server: {
    port: 3000,
  },
});
