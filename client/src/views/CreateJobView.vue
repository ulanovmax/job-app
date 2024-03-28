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
					<InputText v-model="state.title" id="title" placeholder="Role" />
				</fieldset>

				<fieldset class="field">
					<label>Select a job type</label>
					<Dropdown
						v-model="state.selectedType"
						:options="jobTypes"
						showClear
						
						placeholder="Type"
						class="w-full"
					/>
				</fieldset class="field">

				<fieldset class="field">
					<label>Select a preferable English level</label>
					<Dropdown
						v-model="state.selectedLang"
						:options="langs"
						showClear
						
						placeholder="English level"
						class="w-full"
					/>
				</fieldset>

				<fieldset class="field">
					<label>Type required years of experience</label>
					<InputNumber v-model="state.yearsNumber" :useGrouping="false" />
				</fieldset>

				<fieldset class="field col-span-full">
					<label>Type description (optional)</label>
					<Textarea v-model="state.description" class="min-h-44" />
				</fieldset>

				<Button :loading="loading" label="Submit" class="w-fit" type="submit" icon="pi pi-check" />
			</div>
		</form>

		<Toast position="bottom-right" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { useMutation } from "@vue/apollo-composable";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import type { JobType } from "@/ts/types/jobs"
import { CREATE_JOBS } from "@/apollo/mutations/jobs.mutations"

const toast = useToast()

const initialState = {
	title: "",
	selectedType: null,
	selectedLang: null,
	yearsNumber: 0,
	description: ""
}

const state = ref({...initialState});

const jobTypes = ref<JobType[]>(["Office", "Remote"]);
const langs = ref([
	"Beginner",
	"Pre Intermediate",
	"Intermediate",
	"Upper Intermediate",
	"Advanced",
	"Proficient",
]);

const { mutate: createJob, loading, onError, onDone } = useMutation(CREATE_JOBS)

const hundleSubmit = () => {
	createJob({
		input: {
			title: state.value.title,
			type: state.value.selectedType,
			description: state.value.description,
			requirements: {
				englishLevel: state.value.selectedLang,
				years: state.value.yearsNumber
			}
		}
	})
}

onDone(() => {
	state.value = initialState;

	console.log(state.value);
	console.log(initialState);
	
	toast.add({ severity: 'success', summary: 'Success', detail: "Job was successfully created", closable: true, life: 3000 });
})

onError(() => {
	toast.add({ severity: 'error', summary: 'Error', detail: "Job is not created", closable: true, life: 3000 });
})
</script>

<style scoped>
.field {
	@apply flex flex-col gap-3;

	label {
		@apply text-lg
	}
}
</style>
