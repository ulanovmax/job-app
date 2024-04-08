import { createRouter, createWebHistory } from "vue-router";

import baseRoute from "@/router/routes/base.route.ts";
import loginRoute from "@/router/routes/login.route.ts";
import notFoundRoute from "@/router/routes/notFound.route.ts";
import { useAuthStore } from "@/store/auth.store.ts";

const routes = [baseRoute, loginRoute, notFoundRoute];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const { getAccessToken } = useAuthStore();

	if (to.meta.requiresAuth) {
		const access = getAccessToken();
		if (access) {
			// User is authenticated, proceed to the route
			next();
		} else {
			// User is not authenticated, redirect to login
			next({ name: "login" });
		}
	} else {
		// Non-protected route
		if (to.path === "/login" && getAccessToken()) {
			// If user is already authenticated and tries to access login page,
			// redirect to some other page like home or profile
			next({ name: "main" }); // Adjust the destination path accordingly
		} else {
			// Allow access to non-protected routes
			next();
		}
	}
});

export default router;
