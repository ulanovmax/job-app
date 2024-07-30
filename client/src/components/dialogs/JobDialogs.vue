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
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
			ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
			aliquip ex ea commodo consequat. Duis aute irure dolor in
			reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
			pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
			culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</Dialog>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useMutation } from "@vue/apollo-composable";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

import { storeToRefs } from "pinia";

import { DELETE_JOB } from "@/apollo/gql/mutations/jobs.mutations.ts";
import { useJobPopup } from "@/store/dialogs/job-dialog.store.ts";
import { useMyJobsStore } from "@/store/my-jobs.store.ts";

const jobPopupStore = useJobPopup();
const { isEditOpen, isDeleteOpen, selectedJob } = storeToRefs(jobPopupStore);

const { loadMyJobs } = useMyJobsStore();

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
</script>

<style scoped></style>
