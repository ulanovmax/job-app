<template>
	<div class="flex items-center gap-3">
		<router-link
			to="#"
			class="flex items-center rounded-md p-1 font-semibold transition-colors hover:text-primary-300"
		>
			<span
				v-if="name"
				class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 uppercase"
			>
				{{ name[0] }}
			</span>
			<span>{{ name }}</span>
		</router-link>

		<button
			type="button"
			aria-haspopup="true"
			aria-controls="overlay_tmenu"
			class="flex h-5 items-center justify-center text-sm hover:text-primary-300"
			@click="toggle"
		>
			<i class="pi pi-chevron-down"></i>
		</button>

		<TieredMenu id="overlay_tmenu" ref="menu" :model="items" popup />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import TieredMenu from "primevue/tieredmenu";
import { useToast } from "primevue/usetoast";

import { useAuthStore } from "@/store/auth.store.ts";

const { logout } = useAuthStore();
const toast = useToast();
const isLoading = ref(false);

const { getTokenInfo } = useAuthStore();

const menu = ref();
const name = getTokenInfo("name");

const items = ref<MenuItem[]>([
	{
		label: "Add job",
		icon: "pi pi-plus",
	},
	{
		label: "Logout",
		icon: "pi pi-sign-out",
		command() {
			void handleLogout();
		},
	},
]);

const toggle = (event) => {
	menu.value.toggle(event);
};

const handleLogout = async () => {
	isLoading.value = true;

	try {
		await logout();
	} catch (e) {
		toast.add({
			severity: "error",
			summary: "Logout error",
			detail: "Couldn't logout you from account",
			closable: true,
			life: 3000,
		});
	} finally {
		isLoading.value = false;
	}
};
</script>

<style scoped></style>
