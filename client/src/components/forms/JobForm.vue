<template>
	<form @submit.prevent="handleSubmit">
		<div class="grid grid-cols-2 gap-4">
			<fieldset class="field">
				<label for="title">Type job role</label>
				<InputText
					id="title"
					v-model="state.title"
					placeholder="Role"
				/>
			</fieldset>

			<fieldset class="field">
				<label>Select a job type</label>
				<Dropdown
					v-model="state.selectedType"
					:options="jobTypes"
					show-clear
					placeholder="Type"
					class="w-full"
				/>
			</fieldset>

			<fieldset class="field">
				<label>Select a preferable English level</label>
				<Dropdown
					v-model="state.selectedLang"
					:options="langLevels"
					show-clear
					placeholder="English level"
					class="w-full"
				/>
			</fieldset>

			<fieldset class="field">
				<label>Type required years of experience</label>
				<InputNumber
					v-model="state.yearsNumber"
					:use-grouping="false"
				/>
			</fieldset>

			<fieldset class="field col-span-full">
				<label>Type description (optional)</label>
				<Textarea v-model="state.description" class="min-h-44" />
			</fieldset>

			<Button
				:loading="isLoading"
				label="Submit"
				class="w-fit"
				type="submit"
				icon="pi pi-check"
			/>
		</div>
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useMutation } from "@vue/apollo-composable";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

import type { Job, JobCreateInput } from "@/apollo/generated/graphql.ts";
import { JobType } from "@/apollo/generated/graphql.ts";
import {
	CREATE_JOBS,
	UPDATE_JOB,
} from "@/apollo/gql/mutations/jobs.mutations.ts";
import { langLevels } from "@/constants/langLevels.ts";
import type { JobFormType } from "@/ts/types/forms";

const jobTypes = ref<JobType[]>([JobType.Remote, JobType.Office]);

const toast = useToast();

const props = defineProps<{ job?: Job }>();

const emits = defineEmits<{ (e: "update"): void }>();

const isLoading = ref(false);

const initialState: JobFormType = {
	title: "",
	selectedType: null,
	selectedLang: null,
	yearsNumber: 0,
	description: "",
};

const state = ref<JobFormType>(
	props.job
		? {
				title: props.job.title,
				selectedType: props.job.type,
				selectedLang: props.job.requirements?.englishLevel ?? "",
				yearsNumber: props.job.requirements?.years ?? 0,
				description: props.job.description,
			}
		: { ...initialState }
);

const { mutate: createJob } = useMutation(CREATE_JOBS);

const { mutate: updateJob } = useMutation(UPDATE_JOB);

const handleSubmit = async () => {
	isLoading.value = true;

	const body: JobCreateInput = {
		title: state.value.title,
		type: state.value.selectedType,
		description: state.value.description,
		requirements: {
			englishLevel: state.value.selectedLang ?? "",
			years: state.value.yearsNumber,
		},
	};

	try {
		if (props.job) {
			await updateJob({
				input: body,
				id: props.job.id,
				companyId: props.job.company.id,
			});

			toast.success("Job was successfully updated");
		} else {
			await createJob({
				input: body,
			});

			toast.success("Job was successfully created");
		}

		state.value = initialState;

		emits("update");
	} catch (e) {
		if (props.job) {
			toast.error("Couldn't update job");
		} else {
			toast.error("Couldn't create job");
		}
	} finally {
		isLoading.value = false;
	}
};
</script>

<style scoped></style>
