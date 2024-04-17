import { ref } from "vue";

import { defineStore } from "pinia";

export const useJobPopup = defineStore("jobPopup", () => {
	const isEditOpen = ref(false);
	const isDeleteOpen = ref(false);

	return {
		isEditOpen,
		isDeleteOpen,
	};
});
