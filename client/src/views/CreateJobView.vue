<template>
	<div>
		<h1 class="mb-3">Create your opening</h1>
		<p class="mb-10 text-base">
			Please fill the form to create your opening
		</p>

		<form @submit.prevent="hundleSubmit">
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
					:loading="loading"
					label="Submit"
					class="w-fit"
					type="submit"
					icon="pi pi-check"
				/>
			</div>
		</form>

		<Toast position="bottom-right" />
	</div>
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
import Toast from "primevue/toast";

import { JobType } from "@/apollo/generated/graphql.ts";
import { CREATE_JOBS } from "@/apollo/gql/mutations/jobs.mutations.ts";
import { langLevels } from "@/constants/langLevels.ts";

const toast = useToast();

const initialState = {
	title: "",
	selectedType: null,
	selectedLang: null,
	yearsNumber: 0,
	description: "",
};

const state = ref({ ...initialState });

const jobTypes = ref<JobType[]>([JobType.Remote, JobType.Office]);

const {
	mutate: createJob,
	loading,
	onError,
	onDone,
} = useMutation(CREATE_JOBS);

const hundleSubmit = () => {
	void createJob({
		input: {
			title: state.value.title,
			type: state.value.selectedType,
			description: state.value.description,
			requirements: {
				englishLevel: state.value.selectedLang,
				years: state.value.yearsNumber,
			},
		},
	});
};

onDone(() => {
	state.value = initialState;

	toast.success("Job was successfully created");
});

onError(() => {
	toast.error("Couldn't create job");
});
</script>

<style scoped></style>
