<template>
	<v-header class="mb-10" />

	<main class="mb-10 flex-grow pb-10">
		<div class="container">
			<router-view></router-view>
		</div>
	</main>

	<v-footer />
</template>

<script setup lang="ts">
import VFooter from "@/components/layout/VFooter.vue";
import VHeader from "@/components/layout/VHeader.vue";

import { useAuthStore } from "@/store/auth.store.ts";

const { checkProfileAuth } = useAuthStore();

void checkProfileAuth();
</script>

<style scoped lang="postcss"></style>
