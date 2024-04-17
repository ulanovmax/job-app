export default {
	path: "/job-board",
	name: "jobBoard",
	component: () => import("@/views/job-board/JobBoardView.vue"),

	redirect: { name: "jobBoardAll" },

	children: [
		{
			path: "all",
			name: "jobBoardAll",
			component: () => import("@/views/job-board/JobBoardAllView.vue"),
		},
		{
			path: "my",
			name: "jobBoardMy",
			component: () => import("@/views/job-board/JobBoardMyView.vue"),
		},
	],
};
