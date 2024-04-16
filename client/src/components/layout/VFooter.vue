<template>
	<footer class="bg-surface-700">
		<div class="container py-10">
			<div class="flex items-center justify-between gap-10">
				<v-logo class="mb-5" />

				<div class="flex items-center gap-5">
					<a
						href="#"
						target="_blank"
						rel="nofollow"
						class="social-link pi pi-instagram"
					></a>
					<a
						href="#"
						target="_blank"
						rel="nofollow"
						class="social-link pi pi-facebook"
					></a>
					<a
						href="#"
						target="_blank"
						rel="nofollow"
						class="social-link pi pi-github"
					></a>
				</div>
			</div>

			<nav class="mb-10">
				<ul class="flex items-center gap-7">
					<li>
						<router-link class="link" :to="{ name: 'jobBoard' }">
							Job board
						</router-link>
					</li>
					<li>
						<router-link class="link" :to="{ name: 'inbox' }">
							Inbox
						</router-link>
					</li>
				</ul>
			</nav>

			<p class="opacity-50">
				© {{ new Date().getFullYear() }}
				HIRE
			</p>
		</div>
	</footer>
</template>

<script setup lang="ts">
import VLogo from "@/components/base/VLogo.vue";
</script>

<style scoped>
.link {
	@apply gap-2 text-base text-white transition hover:text-primary-200;
}

.social-link {
	@apply text-xl transition hover:scale-110 hover:text-primary-500;
}
</style>
