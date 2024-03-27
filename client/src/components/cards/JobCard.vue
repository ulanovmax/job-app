<template>
	<div class="rounded-lg bg-surface-700 p-4">
		<div class="flex items-start justify-between">
			<div class="mb-2 flex items-center gap-4">
				<router-link to="#" class="text-primary-400 hover:underline">
					{{ data.company.name }}
				</router-link>

				<div class="opacity-60">
					<i class="pi pi-users"></i>
					{{ data.responses }}
				</div>
				<div class="opacity-60">
					<i class="pi pi-calendar"></i>
					{{ formatDate(data.dateCreated) }}
				</div>
			</div>

			<div class="flex items-center gap-3">
				<button class="opacity-50 transition-opacity hover:opacity-100">
					<i class="pi pi-pencil"></i>
				</button>
				<button class="opacity-50 transition-opacity hover:opacity-100">
					<i class="pi pi-ban"></i>
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
				:value="`${data.requirements.years} years of experience`"
			/>
			<Tag severity="warning" :value="data.requirements.englishLevel" />
			<Tag severity="success" :value="data.type" />
		</div>

		<p>
			{{ data.description }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import type { Job } from "@/ts/types/jobs";

interface Props {
	data: Job;
}

defineProps<Props>();

const formatDate = (date: string): string => date.split("T")[0];

import Tag from "primevue/tag";
import Button from "primevue/button";
</script>
