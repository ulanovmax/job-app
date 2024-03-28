<template>
	<div>
		<h1 class="mb-5">Featured jobs 🔥</h1>

		<ProgressSpinner class="mx-auto my-10 !block" v-if="loading" />

		<div v-else class="space-y-5">
			<job-card v-for="card in jobs" :key="card.id" :data="card" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";

import JobCard from "@/components/cards/JobCard.vue";
import ProgressSpinner from "primevue/progressspinner";
import { GET_JOBS } from "@/apollo/queries/jobs.queries";

const { result, loading } = useQuery(GET_JOBS, null, {
	fetchPolicy: "network-only",
});

const jobs = computed(() => result.value.jobs);
</script>

<style scoped lang="postcss"></style>
