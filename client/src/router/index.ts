import { createRouter, createWebHistory } from "vue-router";

import baseRoute from "@/router/routes/base.route.ts";
import loginRoute from "@/router/routes/login.route.ts";
import notFoundRoute from "@/router/routes/notFound.route.ts";

const routes = [baseRoute, loginRoute, notFoundRoute];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	// to.meta.requiresAuth && !user.id
	if (to.meta.requiresAuth) {
		next({ name: "login" }); // If user id not found
	} else {
		next({ name: "main" });
	}
});

export default router;
