<template>
	<jobs-list
		v-if="savedJobs?.items.length"
		editable
		:loading="isLoading"
		:jobs="savedJobs"
		@update:jobs="jobsStore.loadSavedJobs"
	/>

	<div v-else class="mt-10 text-center opacity-50">
		<i class="pi pi-bookmark text-3xl"></i>
		<p class="mt-3 text-xl">You have no saved jobs</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import JobsList from "@/components/lists/JobsList.vue";

import { storeToRefs } from "pinia";

import { useJobsStore } from "@/store/jobs.store.ts";

const jobsStore = useJobsStore();

const { savedJobs } = storeToRefs(jobsStore);

const isLoading = ref(false);

void jobsStore.loadSavedJobs();
</script>

<style scoped></style>
