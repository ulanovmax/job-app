<template>
	<ProgressSpinner v-if="loading" class="mx-auto my-10 !block" />

	<div v-else-if="selectedJob">
		<div class="mb-5">
			<h1 class="mb-3">
				{{ selectedJob.title }}
			</h1>

			<div class="flex items-center gap-4">
				<p class="flex items-center gap-2 opacity-60">
					<i class="pi pi-calendar"></i>
					{{ useFormatDate(selectedJob.dateCreated) }}
				</p>

				<p
					v-if="selectedJob"
					class="flex items-center gap-2 opacity-60"
				>
					<i class="pi pi-users"></i>
					{{ selectedJob.responses.length }}
				</p>
			</div>
		</div>

		<div class="flex items-start justify-between gap-10">
			<div class="content-element flex-grow">
				{{ selectedJob.description ?? "No description" }}
			</div>

			<div class="w-full max-w-sm flex-shrink-0">
				<div class="mb-5 rounded-lg bg-surface-700 p-5">
					<router-link
						v-if="isCompanyShow"
						class="mb-4 block text-xl text-primary-400 hover:underline"
						:to="{
							name: 'companyView',
							params: { id: job.company.id },
						}"
					>
						{{ selectedJob.company.name }}
					</router-link>

					<ul>
						<li class="list-item">
							<i class="pi pi-map-marker"></i>
							{{ selectedJob.country }}
						</li>
						<li class="list-item">
							<i class="pi pi-briefcase"></i>
							{{ selectedJob.type }}
						</li>
						<li class="list-item">
							<i class="pi pi-check-circle"></i>
							{{ selectedJob.requirements?.years }} years of
							experience
						</li>
						<li class="list-item">
							<i class="pi pi-language"></i>
							{{ selectedJob.requirements?.englishLevel }}
						</li>
					</ul>
				</div>

				<Button
					v-if="isCandidate()"
					:label="
						isApplied
							? 'You have already applied'
							: 'Apply for the job'
					"
					class="w-full"
					:disabled="isApplied"
					@click="isApplyOpen = true"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";

import { storeToRefs } from "pinia";

import type { Job } from "@/apollo/generated/graphql.ts";
import { GET_CURRENT_JOB } from "@/apollo/gql/queries/jobs.query.ts";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useAuthStore } from "@/store/auth.store.ts";
import { useJobPopup } from "@/store/dialogs/job-dialog.store.ts";

const { params } = useRoute();

const { getTokenInfo, isCandidate } = useAuthStore();
const tokenInfo = getTokenInfo();

const { selectedJob, isApplyOpen } = storeToRefs(useJobPopup());

const { result, loading } = useQuery<{ job: Job }>(GET_CURRENT_JOB, {
	id: params.id,
});

const job = computed(() => result.value?.job);

const isApplied = computed(() =>
	selectedJob.value?.responses.includes(getTokenInfo().id)
);

const isCompanyShow = computed(() => tokenInfo?.id !== job.value?.company.id);

watch(job, (data) => {
	if (data) {
		selectedJob.value = { ...data };
	}
});
</script>

<style scoped>
.list-item {
	@apply flex items-center gap-3 border-b border-solid border-b-surface-600 py-3 first:pt-0;
}
</style>
