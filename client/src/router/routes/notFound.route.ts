export default {
	path: "/:pathMatch(.*)*",
	name: "notFound",
	component: () => import("@/views/NotFoundView.vue"),

	meta: {
		title: "404 - Not found",
		requiresAuth: true,
	},
};
