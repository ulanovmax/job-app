<template>
	<Dialog
		v-model:visible="isDeleteOpen"
		position="top"
		:style="{ width: '44rem' }"
		:show-header="false"
		closable
		modal
		dismissable-mask
	>
		<h3 class="pt-10 text-center text-xl">
			Are you sure you want to delete
			<span class="text-primary-400"> {{ selectedJob?.title }} </span>
			?
		</h3>
		<template #footer>
			<div v-if="selectedJob" class="mx-auto flex gap-2">
				<Button
					class="dark:text-white"
					label="Cancel"
					severity="info"
					@click="isDeleteOpen = false"
				/>
				<Button
					icon="pi pi-trash"
					class="dark:text-white"
					label="Delete"
					severity="danger"
					:loading="isDeleteLoading"
					@click="handleDelete"
				/>
			</div>
		</template>
	</Dialog>

	<Dialog v-model:visible="isEditOpen" modal header="Edit job">
		<job-form :job="selectedJob" @update="handleEdit" />
	</Dialog>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useMutation } from "@vue/apollo-composable";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

import JobForm from "@/components/forms/JobForm.vue";

import { storeToRefs } from "pinia";

import { DELETE_JOB } from "@/apollo/gql/mutations/jobs.mutations.ts";
import { useJobPopup } from "@/store/dialogs/job-dialog.store.ts";
import { useJobsStore } from "@/store/jobs.store.ts";

const jobPopupStore = useJobPopup();
const { isEditOpen, isDeleteOpen, selectedJob } = storeToRefs(jobPopupStore);

const { loadMyJobs } = useJobsStore();

const { mutate: deleteJob, loading: isDeleteLoading } = useMutation(DELETE_JOB);

const toast = useToast();

const handleDelete = async () => {
	if (selectedJob.value) {
		try {
			const response = await deleteJob({
				id: selectedJob.value.id,
				companyId: selectedJob.value.company.id,
			});

			if (response?.data) {
				const { data } = response;

				toast.success(
					`${data.job?.title || "Job"} was successfully deleted`
				);

				void loadMyJobs();
			}
		} catch (e) {
			toast.error(`Removing was not complete`);
		} finally {
			isDeleteOpen.value = false;
		}
	}
};

const handleEdit = () => {
	isEditOpen.value = false;
	void loadMyJobs();
};
</script>

<style scoped></style>
