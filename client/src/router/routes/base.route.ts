import createJobRoute from "./create-job.route";
import homeRoute from "./home.route";
import inboxRoute from "./inbox.route";
import jobRoute from "./job.route";
import jobBoardRoute from "./job-board.route";

export default {
	path: "/main",
	name: "main",
	component: () => import("@/views/MainView.vue"),

	redirect: { name: "home" },

	meta: { requiresAuth: true },

	children: [jobBoardRoute, inboxRoute, createJobRoute, homeRoute, jobRoute],
};
