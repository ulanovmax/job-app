<template>
	<v-header class="mb-10" />

	<main class="flex-grow pb-10">
		<div class="container">
			<router-view></router-view>
		</div>
	</main>
</template>

<script setup lang="ts">
import VHeader from "@/components/layout/VHeader.vue";
</script>

<style scoped lang="postcss"></style>
