<template>
	<TabMenu
		v-model:active-index="active"
		class="mb-8 overflow-x-visible overflow-y-visible"
		:model="items"
	/>

	<router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import TabMenu from "primevue/tabmenu";

const router = useRouter();

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
		label: "My jobs",
		icon: "pi pi-user",
		command() {
			active.value = 1;
			void router.push({ name: "jobBoardMy" });
		},
	},
]);
</script>

<style scoped></style>
