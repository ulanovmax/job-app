import { defineConfig } from "vite";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), eslintPlugin()],

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@img": path.resolve(__dirname, "./public/images"),
		},
	},
});
