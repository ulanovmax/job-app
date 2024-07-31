<template>
	<TabMenu
		v-model:active-index="active"
		class="mb-8 overflow-x-visible overflow-y-visible"
		:model="items"
	/>

	<router-view></router-view>

	<teleport to="body">
		<job-dialogs />
	</teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import TabMenu from "primevue/tabmenu";

import JobDialogs from "@/components/dialogs/JobDialogs.vue";

import { useAuthStore } from "@/store/auth.store.ts";

const router = useRouter();

const { isCompany } = useAuthStore();

const active = ref(router.currentRoute.value.name === "jobBoardAll" ? 0 : 1);

const items = ref<MenuItem[]>([
	{
		label: "All jobs",
		icon: "pi pi-users",
		command() {
			active.value = 0;
			void router.push({ name: "jobBoardAll" });
		},
	},
	{
		label: isCompany() ? "My jobs" : "Saved jobs",
		icon: "pi pi-user",
		command() {
			active.value = 1;

			if (isCompany()) {
				void router.push({ name: "jobBoardMy" });
			} else {
				void router.push({ name: "jobBoardSaved" });
			}
		},
	},
]);
</script>

<style scoped></style>
