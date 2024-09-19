<template>
	<progress-spinner v-if="loading" />

	<div v-else-if="response">
		<router-link
			:to="{ name: 'jobView', params: { id: response.job.id } }"
			class="mb-5 inline-block text-3xl font-bold hover:underline"
		>
			Job: {{ response.job.title }}
		</router-link>

		<div v-if="isCandidate()" class="mb-4 flex items-center gap-4">
			<router-link
				:to="{
					name: 'companyView',
					params: { id: response.company.id },
				}"
				class="text-primary-400 hover:underline"
			>
				{{ response.company.name }}
			</router-link>

			<div class="opacity-60">
				<i class="pi pi-users"></i>
				{{ response.job.responses.length }}
			</div>

			<div class="opacity-60">
				<i class="pi pi-calendar"></i>
				{{ useFormatDate(response.dateCreated) }}
			</div>
		</div>

		<p v-else class="mb-4">
			Response from:
			<span class="font-semibold">
				{{ response.candidate.name }}
			</span>
		</p>

		<div class="mb-10 flex items-center gap-2">
			<Tag v-if="isCandidate()" :value="response.job.country" />

			<a
				v-if="isCompany()"
				class="hover:underline"
				:href="`mailto:${response.candidate.email}`"
			>
				<Tag :value="response.candidate.email" />
			</a>

			<Tag
				severity="info"
				:value="`${isCandidate() ? response.job.requirements?.years : response.candidate.years} years of experience`"
			/>

			<Tag
				severity="warning"
				:value="
					isCandidate()
						? response.job.requirements?.englishLevel
						: response.candidate.englishLevel
				"
			/>

			<Tag
				v-if="isCandidate()"
				severity="success"
				:value="response.job.type"
			/>
		</div>

		<p class="mb-5 text-lg font-semibold">Message:</p>
		<p>
			{{ response.message }}
		</p>
	</div>

	<div v-else class="mt-10 text-center opacity-50">
		<i class="pi pi-envelope text-3xl"></i>
		<p class="mt-3 text-xl">Response not found</p>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import ProgressSpinner from "primevue/progressspinner";
import Tag from "primevue/tag";

import type {
	GetResponseQuery,
	GetResponseQueryVariables,
} from "@/apollo/generated/graphql.ts";
import { GET_RESPONSE } from "@/apollo/gql/queries/responses.query.ts";
import { useFormatDate } from "@/hooks/useFormatDate.ts";
import { useAuthStore } from "@/store/auth.store.ts";

const route = useRoute();

const { isCandidate, isCompany } = useAuthStore();

const { result, loading } = useQuery<
	GetResponseQuery,
	GetResponseQueryVariables
>(GET_RESPONSE, {
	responseId: route.params.id,
});

const response = computed(() => result.value?.response);
</script>

<style scoped></style>
