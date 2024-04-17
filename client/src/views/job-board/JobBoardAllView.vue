<template>
	<jobs-list
		v-model:offset="offset"
		:loading="loading"
		:jobs="jobs"
		@update:offset="
			refetch({
				limit: PaginationEnum.Limit,
				offset,
			})
		"
	/>
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
</script>

<style scoped></style>
