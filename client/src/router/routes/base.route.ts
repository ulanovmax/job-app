import inboxRoute from "./inbox.route";
import jobBoardRoute from "./job-board.route";

export default {
	path: "/",
	name: "main",
	component: () => import("@/views/MainView.vue"),

	meta: { requiresAuth: true },

	children: [jobBoardRoute, inboxRoute],
};
