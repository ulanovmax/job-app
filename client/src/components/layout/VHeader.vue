<template>
	<header class="py-5">
		<div class="container">
			<div class="flex items-center justify-between">
				<v-logo />

				<nav>
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
									label="Add job"
									icon="pi pi-plus"
									iconPos="right"
								/>
							</router-link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import VLogo from "@/components/base/VLogo.vue";
import Button from "primevue/button";
</script>

<style scoped>
.link {
	@apply hover:text-primary-200 flex items-center gap-2 text-lg font-semibold text-white transition;

	&.router-link-active {
		@apply text-primary-400;
	}
}
</style>
