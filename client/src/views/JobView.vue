<template>
	<ProgressSpinner v-if="loading" class="mx-auto my-10 !block" />

	<div v-else-if="job">
		<div class="mb-5">
			<h1 class="mb-3">
				{{ job.title }}
			</h1>

			<div class="flex items-center gap-4">
				<p class="flex items-center gap-2 opacity-60">
					<i class="pi pi-calendar"></i>
					{{ useFormatDate(job.dateCreated) }}
				</p>

				<p class="flex items-center gap-2 opacity-60">
					<i class="pi pi-users"></i>
					{{ job.responses }}
				</p>
			</div>
		</div>

		<div class="flex items-start justify-between gap-10">
			<div class="content-element flex-grow">
				{{ job.description ? job.description : "No description" }}
			</div>

			<div class="max-w-sm flex-grow rounded-lg bg-surface-700 p-5">
				<router-link
					class="mb-4 block text-xl text-primary-400 hover:underline"
					to="#"
				>
					{{ job.company.name }}
				</router-link>

				<ul>
					<li class="list-item">
						<i class="pi pi-map-marker"></i>
						{{ job.country }}
					</li>
					<li class="list-item">
						<i class="pi pi-briefcase"></i>
						{{ job.type }}
					</li>
					<li class="list-item">
						<i class="pi pi-check-circle"></i>
						{{ job.requirements?.years }} years of experience
					</li>
					<li class="list-item">
						<i class="pi pi-language"></i>
						{{ job.requirements?.englishLevel }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import ProgressSpinner from "primevue/progressspinner";

import type { Job } from "@/apollo/generated/graphql.ts";
import { GET_CURRENT_JOB } from "@/apollo/gql/queries/jobs.query.ts";
import { useFormatDate } from "@/composables/useFormatDate";

const { params } = useRoute();

const { result, loading } = useQuery<{ job: Job }>(GET_CURRENT_JOB, {
	id: params.id,
});

const job = computed(() => result.value?.job);
</script>

<style scoped>
.list-item {
	@apply flex items-center gap-3 border-b border-solid border-b-surface-600 py-3 first:pt-0;
}
</style>
