<template>
	<jobs-list
		v-model:offset="offset"
		:loading="loading"
		:limit="limit"
		:jobs="jobs"
		list-style="grid grid-cols-1 gap-4"
		@update:offset="
			refetch({
				companyId: tokenInfo?.id as string,
				jobsLimit: limit,
				jobsOffset: offset,
			})
		"
	/>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";

import JobsList from "@/components/lists/JobsList.vue";

import type {
	GetJobsByCompanyQuery,
	GetJobsByCompanyQueryVariables,
	JobList,
} from "@/apollo/generated/graphql.ts";
import { GET_JOBS_BY_COMPANY } from "@/apollo/gql/queries/jobs.query.ts";
import { useAuthStore } from "@/store/auth.store.ts";

const limit = ref(2);
const offset = ref(0);

const { getTokenInfo } = useAuthStore();

const tokenInfo = getTokenInfo();

const { result, loading, refetch } = useQuery<
	GetJobsByCompanyQuery,
	GetJobsByCompanyQueryVariables
>(
	GET_JOBS_BY_COMPANY,
	{
		companyId: tokenInfo?.id as string,
		jobsLimit: limit.value,
		jobsOffset: offset.value,
	},
	{
		fetchPolicy: "network-only",
	}
);

const jobs = computed(() => {
	if (result.value?.company) {
		return result.value.company.jobs as JobList;
	}

	return null;
});
</script>

<style scoped></style>
