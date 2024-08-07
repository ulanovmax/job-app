<template>
	<section>
		<div v-if="loading" class="mt-20 text-center">
			<p class="mb-5 text-2xl font-semibold">Please wait...</p>
			<v-loader class="mx-auto" />
		</div>

		<template v-else-if="data">
			<div class="bg fade-down min-h-44 rounded-xl bg-primary-500"></div>

			<div class="fade-up relative z-20 -mt-24 px-5">
				<div
					class="pointer-events-none mb-5 flex h-40 w-40 select-none items-center justify-center rounded-full bg-primary-700 text-7xl font-semibold uppercase"
				>
					{{ data.name[0] }}
				</div>
				<h1 class="mb-2">
					{{ data.name }}
				</h1>

				<h2
					v-if="tokenInfo"
					class="mb-5 text-lg font-normal capitalize opacity-60"
				>
					{{ tokenInfo.role }}
				</h2>

				<ul v-if="isCompany(data)" class="mb-8 space-y-3">
					<li class="list">
						<i class="pi pi-at"></i>
						<a
							class="hover:underline"
							:href="`mailto:${data.email}`"
						>
							{{ data.email }}
						</a>
					</li>
					<li class="list">
						<i class="pi pi-map-marker"></i>
						{{ data.country }}
					</li>
					<li class="list">
						<i class="pi pi-users"></i>
						{{ data.employees }}
						employees
					</li>
					<li class="list">
						<i class="pi pi-calendar"></i>
						on platform since
						{{ useFormatDate(data.dateCreated) }}
					</li>
				</ul>

				<ul v-if="isCandidate(data)" class="mb-8 space-y-3">
					<li class="list">
						<i class="pi pi-at"></i>
						<a
							class="hover:underline"
							:href="`mailto:${data.email}`"
						>
							{{ data.email }}
						</a>
					</li>
					<li class="list">
						<i class="pi pi-language"></i>
						{{ data.englishLevel }} english level
					</li>
					<li class="list">
						<i class="pi pi-check-circle"></i>
						{{ data.years }}
						years of experience
					</li>
				</ul>

				<div v-if="isCompany(data)" class="mb-10">
					<h2>About company</h2>

					<p>
						{{
							data.description
								? data.description
								: "No description"
						}}
					</p>
				</div>

				<div v-if="isCandidate(data)" class="mb-10">
					<h2>Experience</h2>

					<p>
						{{ data.experience }}
					</p>
				</div>

				<div v-if="isCompany(data) && data.jobs.items.length > 0">
					<h2>Last published jobs</h2>

					<jobs-list
						:pagination="false"
						:jobs="jobs"
						:loading="jobsLoading"
						@update:jobs="updateJobs"
					/>
				</div>
			</div>
		</template>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";

import VLoader from "@/components/base/VLoader.vue";
import JobsList from "@/components/lists/JobsList.vue";

import { PaginationEnum } from "@/ts/enums/pagination.enum.ts";

import type {
	Candidate,
	Company,
	GetJobsQuery,
	GetJobsQueryVariables,
	JobList,
} from "@/apollo/generated/graphql.ts";
import { GET_JOBS } from "@/apollo/gql/queries/jobs.query.ts";
import { useFormatDate } from "@/hooks/useFormatDate.ts";
import { useAuthStore } from "@/store/auth.store.ts";
import { useJobsStore } from "@/store/jobs.store.ts";

interface Props {
	data: Candidate | Company | null;
	loading?: boolean;
}

defineProps<Props>();

const { loadSavedJobs } = useJobsStore();

const { getTokenInfo, isCompany, isCandidate } = useAuthStore();

const tokenInfo = getTokenInfo();

if (isCandidate()) {
	void loadSavedJobs();
}

const {
	result,
	loading: jobsLoading,
	refetch,
} = useQuery<GetJobsQuery, GetJobsQueryVariables>(
	GET_JOBS,
	{
		limit: PaginationEnum.Limit,
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

<style scoped>
.bg {
	background: repeating-linear-gradient(
		45deg,
		#008080,
		#008080 10px,
		#20b2aa 10px,
		#20b2aa 20px
	);
}

h2 {
	@apply mb-4 text-xl;
}

.list {
	@apply flex items-center gap-3;
}

.list i {
	@apply text-xl opacity-50;
}
</style>
