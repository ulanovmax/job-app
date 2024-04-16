<template>
	<section>
		<div v-if="isLoading" class="mt-20 text-center">
			<p class="mb-5 text-2xl font-semibold">Please wait...</p>
			<v-loader class="mx-auto" />
		</div>

		<template v-else-if="profileInfo">
			<div class="bg fade-down min-h-44 rounded-xl bg-primary-500"></div>

			<div class="fade-up relative z-20 -mt-20 px-5">
				<div
					class="pointer-events-none mb-5 flex h-40 w-40 select-none items-center justify-center rounded-full bg-primary-700 text-7xl font-semibold uppercase"
				>
					{{ profileInfo.name[0] }}
				</div>
				<h1 class="mb-2">
					{{ profileInfo.name }}
				</h1>

				<h2 class="mb-5 text-lg font-normal opacity-60">
					{{ tokenInfo?.role }}
				</h2>

				<ul class="mb-8 space-y-3">
					<li class="list">
						<i class="pi pi-map-marker"></i>
						{{ profileInfo.country }}
					</li>
					<li class="list">
						<i class="pi pi-users"></i>
						{{ profileInfo.employees }}
						employees
					</li>
					<li class="list">
						<i class="pi pi-calendar"></i>
						on platform since
						{{ useFormatDate(profileInfo.dateCreated) }}
					</li>
				</ul>

				<div class="mb-10">
					<h2>About company</h2>

					<p>
						{{
							profileInfo.description
								? profileInfo.description
								: "No description"
						}}
					</p>
				</div>

				<div
					v-if="
						tokenInfo?.role === 'company' &&
						profileInfo.jobs.items.length > 0
					"
				>
					<h2>Last published jobs</h2>

					<jobs-list :pagination="false" :jobs="profileInfo.jobs" />
				</div>
			</div>
		</template>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";

import VLoader from "@/components/base/VLoader.vue";
import JobsList from "@/components/lists/JobsList.vue";

import type { Company } from "@/apollo/generated/graphql.ts";
import { GET_COMPANY } from "@/apollo/gql/queries/company.query.ts";
import { useAuthStore } from "@/store/auth.store.ts";

import { useFormatDate } from "../composables/useFormatDate.ts";

const { getTokenInfo } = useAuthStore();

const tokenInfo = getTokenInfo();

const profileInfo = ref<Company | null>(null);
const isLoading = ref(false);

if (tokenInfo && tokenInfo.role === "company") {
	isLoading.value = true;

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
</script>

<style scoped>
.bg {
	background: repeating-linear-gradient(
		45deg,
		#008080,
		#008080 10px,
		#20b2aa 10px,
		#20b2aa 20px
	);
}

h2 {
	@apply mb-4 text-xl;
}

.list {
	@apply flex items-center gap-3;
}

.list i {
	@apply text-xl opacity-50;
}
</style>
