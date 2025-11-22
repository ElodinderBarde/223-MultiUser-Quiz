import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Erlaubt uns, describe, it, expect global zu nutzen ohne Import
    environment: "jsdom", // Wichtig für React-Komponenten!
    setupFiles: "./src/setupTests.js", // Optional: Datei für globale Test-Konfiguration
  },
});
