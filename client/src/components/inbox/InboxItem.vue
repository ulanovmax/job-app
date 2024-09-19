<template>
	<router-link
		:to="to"
		class="flex items-start gap-10 border-y border-slate-700 px-2 py-4 transition-colors hover:bg-slate-700"
	>
		<div v-if="profileInfo" class="flex flex-shrink-0 items-center gap-3">
			<profile-avatar>
				{{ profileInfo.name[0] }}
			</profile-avatar>

			<div>
				<span>
					{{ profileInfo.name }}
				</span>

				<p class="text-xs font-medium text-slate-500">
					{{ useFormatDate(data.dateCreated) }}
				</p>
			</div>
		</div>

		<div>
			<h2 class="mb-5">
				{{ data.job.title }}
			</h2>

			<p class="line-camp line-camp-4">
				{{ data.message }}
			</p>
		</div>
	</router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationNormalized } from "vue-router";

import ProfileAvatar from "@/components/base/ProfileAvatar.vue";

import type { Response } from "@/apollo/generated/graphql.ts";
import { useFormatDate } from "@/hooks/useFormatDate.ts";
import type { Roles } from "@/ts/types/token";

interface Props {
	data: Response;
	role: Roles;
	to: RouteLocationNormalized;
}

const props = defineProps<Props>();

const profileInfo = computed(() =>
	props.role === "company" ? props.data.candidate : props.data.company
);
</script>

<style scoped></style>
