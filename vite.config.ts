import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        conditions: ["module", "import", "node"],
        alias: { "@": path.resolve(__dirname, "./src") },
    },
    plugins: [react()],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
