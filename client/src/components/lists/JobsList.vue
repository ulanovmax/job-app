<template>
	<ProgressSpinner v-if="loading" class="mx-auto my-10 !block" />

	<div v-else-if="jobs" class="grid grid-cols-2 gap-4">
		<job-card v-for="card in jobs.items" :key="card.id" :data="card" />
	</div>

	<Paginator
		v-if="pagination && jobs?.totalCount"
		v-model:first="offset"
		:always-show="false"
		class="mt-5"
		:rows="limit"
		:total-records="jobs.totalCount"
		@update:first="changePage"
	></Paginator>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Paginator from "primevue/paginator";
import ProgressSpinner from "primevue/progressspinner";

import JobCard from "@/components/cards/JobCard.vue";

import type { JobList } from "@/apollo/generated/graphql.ts";

interface Props {
	jobs: JobList | null;
	loading?: boolean;
	pagination?: boolean;
	limit?: number;
	offset?: number;
}

interface Emits {
	(e: "update:offset", value: Props["offset"]): void;
}

const props = withDefaults(defineProps<Props>(), {
	pagination: true,
	limit: 4,
	offset: 0,
});

const emits = defineEmits<Emits>();

const offset = ref(props.offset);
const limit = ref(props.limit);

const changePage = (first: number) => {
	emits("update:offset", first);
};
</script>

<style scoped></style>
