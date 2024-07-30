import { ref } from "vue";

import { defineStore } from "pinia";

import type { Job } from "@/apollo/generated/graphql.ts";

export const useJobPopup = defineStore("jobPopup", () => {
	const isEditOpen = ref(false);
	const isDeleteOpen = ref(false);

	const selectedJob = ref<Job>();

	return {
		isEditOpen,
		isDeleteOpen,
		selectedJob,
	};
});
