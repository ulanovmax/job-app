<template>
	<div>
		<h1 class="mb-5">Featured jobs 🔥</h1>

		<jobs-list
			v-model:offset="offset"
			:pagination="false"
			:loading="loading"
			:jobs="jobs"
			@update:jobs="updateJobs"
			@update:offset="
				refetch({
					limit: PaginationEnum.Limit,
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

import { PaginationEnum } from "@/ts/enums/pagination.enum.ts";

import type {
	GetJobsQuery,
	GetJobsQueryVariables,
	JobList,
} from "@/apollo/generated/graphql.ts";
import { GET_JOBS } from "@/apollo/gql/queries/jobs.query.ts";
import { useAuthStore } from "@/store/auth.store.ts";
import { useJobsStore } from "@/store/jobs.store.ts";

const { loadSavedJobs } = useJobsStore();
const { isCandidate } = useAuthStore();

if (isCandidate()) {
	void loadSavedJobs();
}

const offset = ref(0);

const { result, loading, refetch } = useQuery<
	GetJobsQuery,
	GetJobsQueryVariables
>(
	GET_JOBS,
	{
		limit: PaginationEnum.Limit,
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

const updateJobs = async () => {
	await loadSavedJobs();
	await refetch();
};
</script>

<style scoped lang="postcss"></style>
