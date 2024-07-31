<template>
	<Button
		label="Add new job"
		icon="pi pi-plus"
		class="mb-10"
		icon-pos="right"
		@click="router.push({ name: 'createJob' })"
	/>

	<jobs-list
		v-model:offset="offset"
		editable
		:loading="isLoading"
		:jobs="jobs"
		@update:offset="myJobsStore.loadMyJobs()"
	/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";

import JobsList from "@/components/lists/JobsList.vue";

import { storeToRefs } from "pinia";

import { useMyJobsStore } from "@/store/my-jobs.store.ts";

const router = useRouter();

const myJobsStore = useMyJobsStore();
const { offset, jobs } = storeToRefs(myJobsStore);

const isLoading = ref(false);

void myJobsStore.loadMyJobs();
</script>

<style scoped></style>
