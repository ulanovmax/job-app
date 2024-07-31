import { useAuthStore } from "@/store/auth.store.ts";

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

			beforeEnter: () => {
				const { isCompany } = useAuthStore();

				if (!isCompany()) {
					return { name: "main" };
				}
			},
		},
		{
			path: "saved",
			name: "jobBoardSaved",
			component: () => import("@/views/job-board/JobBoardSavedView.vue"),
		},
	],
};
