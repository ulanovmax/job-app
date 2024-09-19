<template>
	<form @submit.prevent="addResponse">
		<div class="grid grid-cols-2 gap-4">
			<div class="field col-span-full">
				<label>
					Tell what interests you in this job and why you'd be a good
					fit.
				</label>
				<Textarea v-model="applyText" class="min-h-44" />
			</div>

			<Button
				:loading="isLoading"
				label="Apply"
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
import Textarea from "primevue/textarea";

import type { Job } from "@/apollo/generated/graphql.ts";
import { CREATE_RESPONSE } from "@/apollo/gql/mutations/responses.mutation.ts";

interface Props {
	job?: Job;
}

interface Emits {
	(e: "added"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const applyText = ref("");
const isLoading = ref(false);

const toast = useToast();

const { mutate } = useMutation(CREATE_RESPONSE);

const addResponse = async () => {
	if (props.job) {
		isLoading.value = true;

		try {
			await mutate({
				jobId: props.job.id,
				text: applyText.value,
			});

			toast.success("Response has been sent");

			emits("added");
		} catch (e) {
			console.log(e);
			toast.error("Response has not been sent");
		} finally {
			isLoading.value = false;
		}
	}
};
</script>

<style scoped></style>
