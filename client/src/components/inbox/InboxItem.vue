<template>
	<router-link
		:to="to"
		class="flex items-start gap-10 border-y border-slate-700 px-2 py-4 transition-colors hover:bg-slate-700"
	>
		<div class="flex flex-shrink-0 items-center gap-3">
			<profile-avatar>
				{{ profileName[0] }}
			</profile-avatar>

			<div>
				<span>
					{{ profileName }}
				</span>

				<p class="text-xs font-medium text-slate-500">
					{{ useFormatDate(date) }}
				</p>
			</div>
		</div>

		<div>
			<h2 class="mb-5">
				{{ jobName }}
			</h2>

			<p>
				{{ message }}
			</p>
		</div>
	</router-link>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";

import ProfileAvatar from "@/components/base/ProfileAvatar.vue";

import { useFormatDate } from "@/hooks/useFormatDate.ts";

interface Props {
	profileName: string;
	date: string;
	jobName: string;
	message: string;
	to: RouteLocationNormalized;
}

defineProps<Props>();
</script>

<style scoped></style>
