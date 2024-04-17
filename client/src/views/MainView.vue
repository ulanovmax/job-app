<template>
	<v-header class="mb-10" />

	<main class="mb-10 flex-grow pb-10">
		<div class="container">
			<router-view></router-view>
		</div>
	</main>

	<v-footer />

	<dialog-list />
</template>

<script setup lang="ts">
import DialogList from "@/components/dialogs/DialogList.vue";
import VFooter from "@/components/layout/VFooter.vue";
import VHeader from "@/components/layout/VHeader.vue";
</script>

<style scoped lang="postcss"></style>
