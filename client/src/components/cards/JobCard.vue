<template>
	<router-link
		:to="{ name: 'jobView', params: { id: data.id } }"
		class="block rounded-lg bg-surface-700 p-4 transition-colors hover:bg-surface-600"
	>
		<div class="flex items-start justify-between">
			<div class="mb-2 flex items-center gap-4">
				<router-link
					v-if="isCompanyShow"
					:to="{
						name: 'companyView',
						params: { id: data.company.id },
					}"
					class="text-primary-400 hover:underline"
				>
					{{ data.company.name }}
				</router-link>

				<div class="opacity-60">
					<i class="pi pi-users"></i>
					{{ data.responses }}
				</div>
				<div class="opacity-60">
					<i class="pi pi-calendar"></i>
					{{ useFormatDate(data.dateCreated) }}
				</div>
			</div>

			<div v-if="editable" class="flex items-center gap-2" @click.prevent>
				<button class="action-btn bg-surface-800" @click="editJob">
					<i class="pi pi-pencil"></i>
				</button>
				<button class="action-btn bg-red-500" @click="deleteJob">
					<i class="pi pi-trash"></i>
				</button>
			</div>
		</div>

		<div class="mb-2.5 flex items-center">
			<h3 class="mr-5 text-lg">
				{{ data.title }}
			</h3>
		</div>

		<div class="mb-4 flex items-center gap-2">
			<Tag :value="data.country" />
			<Tag
				severity="info"
				:value="`${data.requirements?.years} years of experience`"
			/>
			<Tag severity="warning" :value="data.requirements?.englishLevel" />
			<Tag severity="success" :value="data.type" />
		</div>

		<p>
			{{ data.description }}
		</p>

		<teleport to="body">
			<job-dialogs />
		</teleport>
	</router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Tag from "primevue/tag";

import JobDialogs from "@/components/dialogs/JobDialogs.vue";

import { storeToRefs } from "pinia";

import type { Job } from "@/apollo/generated/graphql.ts";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useAuthStore } from "@/store/auth.store.ts";
import { useJobPopup } from "@/store/dialogs/job-dialog.store.ts";

interface Props {
	data: Job;
	editable?: boolean;
}

const props = defineProps<Props>();

const jobPopupStore = useJobPopup();
const { isEditOpen, isDeleteOpen, selectedJob } = storeToRefs(jobPopupStore);

const editJob = () => {
	isEditOpen.value = true;
	selectedJob.value = { ...props.data };
};

const deleteJob = () => {
	isDeleteOpen.value = true;
	selectedJob.value = { ...props.data };
};

const { params } = useRoute();
const { getTokenInfo } = useAuthStore();
const tokenInfo = getTokenInfo();

const isCompanyShow = computed(
	() =>
		params.id !== props.data.company.id &&
		tokenInfo?.id !== props.data.company.id
);
</script>

<style scoped>
.action-btn {
	@apply h-10 w-10 rounded-lg transition-opacity hover:opacity-60;
}
</style>
