import { ref } from "vue";

import { PaginationEnum } from "@/ts/enums/pagination.enum.ts";

import { defineStore } from "pinia";

import { apolloClient } from "@/apollo";
import type { JobList } from "@/apollo/generated/graphql.ts";
import { GET_CANDIDATE } from "@/apollo/gql/queries/candidate.query.ts";
import { GET_JOBS_BY_COMPANY } from "@/apollo/gql/queries/jobs.query.ts";
import { useAuthStore } from "@/store/auth.store.ts";

export const useJobsStore = defineStore("jobs", () => {
	const jobs = ref<JobList | null>(null);
	const savedJobs = ref<JobList | null>(null);

	const offset = ref(0);

	const loadMyJobs = async () => {
		const { getTokenInfo, isCompany } = useAuthStore();

		const tokenInfo = getTokenInfo();

		if (isCompany()) {
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
		}
	};

	const loadSavedJobs = async () => {
		const { getTokenInfo, isCandidate } = useAuthStore();

		const tokenInfo = getTokenInfo();

		if (isCandidate()) {
			const { data } = await apolloClient.query({
				query: GET_CANDIDATE,
				variables: {
					id: tokenInfo?.id as string,
				},
				fetchPolicy: "network-only",
			});

			console.log(data.candidate);

			if (data.candidate) {
				savedJobs.value = data.candidate.savedJobs;
			}
		}
	};

	const isJobSaved = (jobId: string) => {
		return savedJobs.value?.items.some((job) => job.id === jobId) ?? false;
	};

	return {
		loadMyJobs,
		loadSavedJobs,
		isJobSaved,
		jobs,
		savedJobs,
		offset,
	};
});
