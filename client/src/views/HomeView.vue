<template>
	<div>
		<h1 class="mb-5">Featured jobs 🔥</h1>

		<ProgressSpinner v-if="loading" class="mx-auto my-10 !block" />

		<div v-else class="space-y-5">
			<job-card v-for="card in jobs" :key="card.id" :data="card" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import ProgressSpinner from "primevue/progressspinner";

import JobCard from "@/components/cards/JobCard.vue";

import { GET_JOBS } from "@/apollo/queries/jobs.queries";

const { result, loading } = useQuery(GET_JOBS, null, {
	fetchPolicy: "network-only",
});

// fetch("http://localhost:9000/graphql", {
// 	method: "POST",
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// 	body: JSON.stringify({
// 		operationName: "getJobs",
// 		variables: {},
// 		query: "query getJobs { jobs { title } }",
// 	}),
// });

const jobs = computed(() => result.value.jobs);
</script>

<style scoped lang="postcss"></style>
