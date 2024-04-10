import eslintPlugin from "@nabla/vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [vue(), eslintPlugin()],

		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"@img": path.resolve(__dirname, "./public/images"),
			},
		},

		build: {
			sourcemap: true,
		},

		define: {
			"process.env.COUNTRIES_API_KEY": JSON.stringify(
				env.COUNTRIES_API_KEY
			),
		},
	};
});
