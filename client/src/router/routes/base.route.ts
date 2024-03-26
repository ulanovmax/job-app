import inboxRoute from "./inbox.route";
import jobBoardRoute from "./job-board.route";
import createJobRoute from "./create-job.route";
import homeRoute from "./home.route";

export default {
	path: "/main",
	name: "main",
	component: () => import("@/views/MainView.vue"),

	meta: { requiresAuth: true },

	children: [jobBoardRoute, inboxRoute, createJobRoute, homeRoute],
};
