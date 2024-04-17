<template>
	<profile-layout :data="profileInfo" :loading="isLoading" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";

import ProfileLayout from "@/components/layout/ProfileLayout.vue";

import type { Candidate, Company } from "@/apollo/generated/graphql.ts";
import { GET_CANDIDATE } from "@/apollo/gql/queries/candidate.query.ts";
import { GET_COMPANY } from "@/apollo/gql/queries/company.query.ts";
import { useAuthStore } from "@/store/auth.store.ts";

const { getTokenInfo } = useAuthStore();

const tokenInfo = getTokenInfo();

const profileInfo = ref<Company | null | Candidate>(null);
const isLoading = ref(true);

// Set company profile info
if (tokenInfo?.role === "company") {
	const { result, onResult } = useQuery<{ company: Company }>(GET_COMPANY, {
		companyId: tokenInfo.id,
		jobsLimit: 4,
	});

	onResult(() => {
		if (result.value) {
			profileInfo.value = result.value.company;

			isLoading.value = false;
		}
	});
}

// Set candidate profile info
if (tokenInfo?.role === "candidate") {
	const { result, onResult } = useQuery<{ candidate: Candidate }>(
		GET_CANDIDATE,
		{
			id: tokenInfo.id,
		}
	);

	onResult(() => {
		if (result.value) {
			profileInfo.value = result.value.candidate;

			isLoading.value = false;
		}
	});
}
</script>

<style scoped></style>
