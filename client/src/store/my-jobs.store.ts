import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";

import { PaginationEnum } from "@/ts/enums/pagination.enum.ts";

import { defineStore } from "pinia";

import { apolloClient } from "@/apollo";
import type { JobList } from "@/apollo/generated/graphql.ts";
import { GET_JOBS_BY_COMPANY } from "@/apollo/gql/queries/jobs.query.ts";
import { useAuthStore } from "@/store/auth.store.ts";

export const useMyJobsStore = defineStore("myJobs", () => {
	const jobs = ref<JobList | null>(null);

	const offset = ref(0);

	const loadMyJobs = async () => {
		const { getTokenInfo } = useAuthStore();

		const tokenInfo = getTokenInfo();

		try {
			const { data } = await apolloClient.query({
				query: GET_JOBS_BY_COMPANY,
				variables: {
					companyId: tokenInfo?.id as string,
					jobsLimit: PaginationEnum.Limit,
					jobsOffset: offset.value,
				},
			});

			if (data.company) {
				jobs.value = data.company.jobs as JobList;
			}
		} catch (e) {
			console.log(e);
		}

		// const { result, onResult, loading, refetch } = useQuery(
		// 	GET_JOBS_BY_COMPANY,
		// 	{
		// 		companyId: tokenInfo?.id as string,
		// 		jobsLimit: PaginationEnum.Limit,
		// 		jobsOffset: offset.value,
		// 	},
		// 	{
		// 		fetchPolicy: "network-only",
		// 	}
		// );
		//
		// onResult(() => {
		// 	console.log(result.value);
		//
		// 	if (result.value?.company) {
		// 		jobs.value = result.value.company.jobs as JobList;
		// 	}
		// });
		//
		// return { loading, refetch };
	};

	return {
		loadMyJobs,
		jobs,
		offset,
	};
});
