<template>
	<ProgressSpinner v-if="loading" class="mx-auto my-10 !block" />

	<div v-else-if="jobs" :class="[listStyle]">
		<job-card
			v-for="card in jobs.items"
			:key="card.id"
			:editable="editable"
			:data="card"
			@save="handleSave"
			@remove-saved="handleRemoveSave"
		/>
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
import { useMutation } from "@vue/apollo-composable";
import Paginator from "primevue/paginator";
import ProgressSpinner from "primevue/progressspinner";

import JobCard from "@/components/cards/JobCard.vue";

import { PaginationEnum } from "@/ts/enums/pagination.enum.ts";

import type { Job, JobList } from "@/apollo/generated/graphql.ts";
import {
	REMOVE_SAVED_JOB_FOR_CANDIDATE,
	SAVE_JOB_FOR_CANDIDATE,
} from "@/apollo/gql/mutations/candidate.mutation.ts";
import { useAuthStore } from "@/store/auth.store.ts";

interface Props {
	jobs: JobList | null;
	editable?: boolean;
	loading?: boolean;
	pagination?: boolean;
	limit?: number;
	offset?: number;
	listStyle?: string;
}

interface Emits {
	(e: "update:offset", value: Props["offset"]): void;
	(e: "update:jobs"): void;
}

const props = withDefaults(defineProps<Props>(), {
	pagination: true,
	limit: PaginationEnum.Limit,
	offset: 0,
	listStyle: "grid grid-cols-1 gap-4",
});

const emits = defineEmits<Emits>();

const { getTokenInfo } = useAuthStore();

const offset = ref(props.offset);
const limit = ref(props.limit);

const changePage = (first: number) => {
	emits("update:offset", first);
};

const { mutate: saveJob } = useMutation(SAVE_JOB_FOR_CANDIDATE);
const { mutate: removeJob } = useMutation(REMOVE_SAVED_JOB_FOR_CANDIDATE);

const handleSave = async (id: Job["id"]) => {
	const tokenInfo = getTokenInfo();

	if (tokenInfo) {
		await saveJob({
			jobId: id,
			candidateId: tokenInfo.id,
		});

		emits("update:jobs");
	}
};

const handleRemoveSave = async (id: Job["id"]) => {
	const tokenInfo = getTokenInfo();

	if (tokenInfo) {
		await removeJob({
			jobId: id,
			candidateId: tokenInfo.id,
		});

		emits("update:jobs");
	}
};
</script>

<style scoped></style>
