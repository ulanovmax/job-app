<template>
	<profile-layout :loading="loading" :data="companyInfo" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";

import ProfileLayout from "@/components/layout/ProfileLayout.vue";

import type { Company } from "@/apollo/generated/graphql.ts";
import { GET_COMPANY } from "@/apollo/gql/queries/company.query.ts";

const route = useRoute();

const companyInfo = computed<Company | null>(
	() => result.value?.company ?? null
);

const { result, loading } = useQuery<{ company: Company }>(GET_COMPANY, {
	companyId: route.params.id,
	jobsLimit: 4,
});
</script>

<style scoped></style>
