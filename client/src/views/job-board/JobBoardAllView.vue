<template>
	<jobs-list
		v-model:offset="offset"
		:loading="loading"
		:limit="limit"
		:jobs="jobs"
		list-style="grid grid-cols-1 gap-4"
		@update:offset="
			refetch({
				limit,
				offset,
			})
		"
	/>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";

import JobsList from "@/components/lists/JobsList.vue";

import type { JobList } from "@/apollo/generated/graphql.ts";
import { GET_JOBS } from "@/apollo/gql/queries/jobs.query.ts";

const limit = ref(10);
const offset = ref(0);

const { result, loading, refetch } = useQuery<{ jobs: JobList }>(
	GET_JOBS,
	{
		limit: limit.value,
		offset: offset.value,
	},
	{
		fetchPolicy: "network-only",
	}
);

const jobs = computed(() => {
	if (result.value) {
		const { items, totalCount } = result.value.jobs;

		return { items, totalCount };
	}

	return null;
});
</script>

<style scoped></style>
