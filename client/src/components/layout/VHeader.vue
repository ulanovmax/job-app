<template>
	<header class="py-5">
		<div class="container">
			<div class="flex items-center">
				<v-logo />

				<nav class="ml-auto mr-5">
					<ul class="flex items-center gap-7">
						<li>
							<router-link
								class="link"
								:to="{ name: 'jobBoard' }"
							>
								Job board
								<i class="pi pi-book"></i>
							</router-link>
						</li>
						<li>
							<router-link class="link" :to="{ name: 'inbox' }">
								Inbox
								<i class="pi pi-inbox"></i>
							</router-link>
						</li>
						<li>
							<router-link
								class="link"
								:to="{ name: 'createJob' }"
							>
								<Button
									size="small"
									label="Add job"
									icon="pi pi-plus"
									icon-pos="right"
								/>
							</router-link>
						</li>
					</ul>
				</nav>

				<Button
					size="small"
					severity="danger"
					label="Logout"
					icon="pi pi-sign-out"
					icon-pos="right"
					:loading="isLoading"
					@click="handleLogout"
				/>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

import VLogo from "@/components/base/VLogo.vue";

import { useAuthStore } from "@/store/auth.store.ts";

const { logout } = useAuthStore();
const toast = useToast();
const isLoading = ref(false);

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

<style scoped>
.link {
	@apply flex items-center gap-2 text-lg font-semibold text-white transition hover:text-primary-200;

	&.router-link-active {
		@apply text-primary-400;
	}
}
</style>
