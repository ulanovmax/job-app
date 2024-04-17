<template>
	<ProgressSpinner v-if="loading" class="mx-auto my-10 !block" />

	<div v-else-if="jobs" :class="[listStyle]">
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

import { PaginationEnum } from "@/ts/enums/pagination.enum.ts";

import type { JobList } from "@/apollo/generated/graphql.ts";

interface Props {
	jobs: JobList | null;
	loading?: boolean;
	pagination?: boolean;
	limit?: number;
	offset?: number;
	listStyle?: string;
}

interface Emits {
	(e: "update:offset", value: Props["offset"]): void;
}

const props = withDefaults(defineProps<Props>(), {
	pagination: true,
	limit: PaginationEnum.Limit,
	offset: 0,
	listStyle: "grid grid-cols-1 gap-4",
});

const emits = defineEmits<Emits>();

const offset = ref(props.offset);
const limit = ref(props.limit);

const changePage = (first: number) => {
	emits("update:offset", first);
};
</script>

<style scoped></style>
