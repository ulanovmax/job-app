export default {
	path: "/company/:id",
	name: "companyView",
	component: () => import("@/views/CompanyView.vue"),
};
