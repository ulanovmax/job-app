<template>
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

import JobsList from "@/components/lists/JobsList.vue";

import { storeToRefs } from "pinia";

import { useAuthStore } from "@/store/auth.store.ts";
import { useMyJobsStore } from "@/store/my-jobs.store.ts";

const { getTokenInfo } = useAuthStore();

const tokenInfo = getTokenInfo();

const myJobsStore = useMyJobsStore();
const { offset, jobs } = storeToRefs(myJobsStore);

const isLoading = ref(false);

void myJobsStore.loadMyJobs();
</script>

<style scoped></style>
