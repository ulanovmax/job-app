import { ref } from "vue";

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

		const { data } = await apolloClient.query({
			query: GET_JOBS_BY_COMPANY,
			variables: {
				companyId: tokenInfo?.id as string,
				jobsLimit: PaginationEnum.Limit,
				jobsOffset: offset.value,
			},
			fetchPolicy: "network-only",
		});

		if (data.company) {
			jobs.value = data.company.jobs as JobList;
		}
	};

	return {
		loadMyJobs,
		jobs,
		offset,
	};
});
