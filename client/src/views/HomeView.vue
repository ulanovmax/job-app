<template>
	<div>
		<h1 class="mb-5">Featured jobs 🔥</h1>

		<jobs-list
			v-model:offset="offset"
			:pagination="false"
			:loading="loading"
			:limit="limit"
			:jobs="jobs"
			@update:offset="
				refetch({
					limit,
					offset,
				})
			"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";

import JobsList from "@/components/lists/JobsList.vue";

import type {
	GetJobsQuery,
	GetJobsQueryVariables,
	JobList,
} from "@/apollo/generated/graphql.ts";
import { GET_JOBS } from "@/apollo/gql/queries/jobs.query.ts";

const limit = ref(4);
const offset = ref(0);

const { result, loading, refetch } = useQuery<
	GetJobsQuery,
	GetJobsQueryVariables
>(
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
		return result.value.jobs as JobList;
	}

	return null;
});
</script>

<style scoped lang="postcss"></style>
