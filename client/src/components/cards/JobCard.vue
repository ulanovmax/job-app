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

			<div v-if="editable" class="flex items-center gap-3">
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
				:value="`${data.requirements?.years} years of experience`"
			/>
			<Tag severity="warning" :value="data.requirements?.englishLevel" />
			<Tag severity="success" :value="data.type" />
		</div>

		<p>
			{{ data.description }}
		</p>
	</router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Tag from "primevue/tag";

import type { Job } from "@/apollo/generated/graphql.ts";
import { useFormatDate } from "@/composables/useFormatDate";
import { useAuthStore } from "@/store/auth.store.ts";

interface Props {
	data: Job;
	editable?: boolean;
}

const props = defineProps<Props>();

const { params } = useRoute();
const { getTokenInfo } = useAuthStore();
const tokenInfo = getTokenInfo();

const isCompanyShow = computed(
	() =>
		params.id !== props.data.company.id &&
		tokenInfo?.id !== props.data.company.id
);
</script>
