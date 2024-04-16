<template>
	<div>
		<h1 class="mb-5">Featured jobs 🔥</h1>

		<ProgressSpinner v-if="loading" class="mx-auto my-10 !block" />

		<div v-else-if="jobs" class="space-y-5">
			<job-card v-for="card in jobs.items" :key="card.id" :data="card" />
		</div>

		<Paginator
			v-if="jobs?.totalCount"
			v-model:first="offset"
			class="mt-5"
			:rows="limit"
			:total-records="jobs.totalCount"
			@update:first="changePage"
		></Paginator>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import Paginator from "primevue/paginator";
import ProgressSpinner from "primevue/progressspinner";

import JobCard from "@/components/cards/JobCard.vue";

import { GET_JOBS } from "@/apollo/gql/queries/jobs.queries";
import type { JobList } from "@/ts/types/jobs";

const limit = ref(2);
const offset = ref(0);

const { result, loading, refetch } = useQuery(
	GET_JOBS,
	{
		limit: limit.value,
		offset: offset.value,
	},
	{
		fetchPolicy: "network-only",
	}
);

const changePage = (first: number) => {
	offset.value = first;

	void refetch({
		limit: limit.value,
		offset: offset.value,
	});
};

const jobs = computed<JobList | undefined>(() => {
	if (result.value) {
		const { items, totalCount } = result.value.jobs;

		return { items, totalCount };
	}

	return;
});
</script>

<style scoped lang="postcss"></style>
