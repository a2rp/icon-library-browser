import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/icon-library-browser/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
