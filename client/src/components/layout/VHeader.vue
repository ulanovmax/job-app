<template>
	<header class="py-5">
		<div class="container">
			<div class="flex items-center">
				<v-logo />

				<nav class="ml-16">
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
					</ul>
				</nav>

				<header-menu class="ml-auto" />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

import HeaderMenu from "@/components/base/HeaderMenu.vue";
import VLogo from "@/components/base/VLogo.vue";

import { useAuthStore } from "@/store/auth.store.ts";
</script>

<style scoped>
.link {
	@apply flex items-center gap-2 text-base font-semibold text-white transition hover:text-primary-200;

	&.router-link-active {
		@apply text-primary-400;
	}
}
</style>
