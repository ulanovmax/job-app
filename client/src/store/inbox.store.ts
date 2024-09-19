import { ref } from "vue";

import { defineStore } from "pinia";

import type { Response } from "@/apollo/generated/graphql.ts";

export const useInboxStore = defineStore("inbox", () => {
	const responses = ref<Response[]>([]);
	const showLabel = ref(false);

	return {
		responses,
		showLabel,
	};
});
