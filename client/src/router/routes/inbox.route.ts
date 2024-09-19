export default {
	path: "/inbox",
	name: "inbox",
	component: () => import("@/views/inbox/MainInbox.vue"),

	children: [
		{
			path: ":id",
			name: "inboxView",
			component: () => import("@/views/inbox/InboxView.vue"),
		},
	],
};
