<template>
	<div>
		<h1 class="mb-5 text-3xl">Featured jobs 🔥</h1>

		<ProgressSpinner class="mx-auto my-10 !block" v-if="loading" />

		<div v-else class="space-y-5">
			<job-card v-for="card in jobs" :key="card.id" :data="card" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

import JobCard from "@/components/cards/JobCard.vue";
import ProgressSpinner from "primevue/progressspinner";

const { result, loading } = useQuery(gql`
	query getJobs {
		jobs {
			title
			id
			country
			responses
			type
			description
			dateCreated

			requirements {
				years
				englishLevel
			}

			company {
				name
			}
		}
	}
`);

const jobs = computed(() => result.value.jobs);
</script>

<style scoped lang="postcss"></style>
