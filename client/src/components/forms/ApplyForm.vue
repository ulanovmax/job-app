<template>
	<form @submit.prevent="">
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
import Button from "primevue/button";
import Textarea from "primevue/textarea";

import type { Job } from "@/apollo/generated/graphql.ts";

interface Props {
	job?: Job;
}

defineProps<Props>();

const applyText = ref("");
const isLoading = ref(false);
</script>

<style scoped></style>
