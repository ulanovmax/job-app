<template>
	<jobs-list
		v-model:offset="offset"
		editable
		:loading="loading"
		:jobs="jobs"
		@update:offset="
			refetch({
				companyId: tokenInfo?.id as string,
				jobsLimit: PaginationEnum.Limit,
				jobsOffset: offset,
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
	GetJobsByCompanyQuery,
	GetJobsByCompanyQueryVariables,
	JobList,
} from "@/apollo/generated/graphql.ts";
import { GET_JOBS_BY_COMPANY } from "@/apollo/gql/queries/jobs.query.ts";
import { useAuthStore } from "@/store/auth.store.ts";

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
		jobsLimit: PaginationEnum.Limit,
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
