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
								<span class="relative">
									<i class="pi pi-inbox"></i>
									<span v-if="showLabel" class="count"></span>
								</span>
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
import { ref, watch } from "vue";

import HeaderMenu from "@/components/base/HeaderMenu.vue";
import VLogo from "@/components/base/VLogo.vue";

import { storeToRefs } from "pinia";

import { useInboxStore } from "@/store/inbox.store.ts";

const { responses, showLabel } = storeToRefs(useInboxStore());

watch(responses, (value, oldValue) => {
	if (value.length > oldValue.length) {
		showLabel.value = true;
	}
});
</script>

<style scoped>
.link {
	@apply flex items-center gap-2 text-base font-semibold text-white transition hover:text-primary-200;

	&.router-link-active {
		@apply text-primary-400;
	}
}

.count {
	@apply absolute right-0 top-0 block h-1.5 w-1.5 rounded-full bg-red-500;
}
</style>
