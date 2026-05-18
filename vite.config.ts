import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss(), // плагин для работы с tailwind css v4
        reactRouter(), // плагин для интеграции react router с vite
    ],
});