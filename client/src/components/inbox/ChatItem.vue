<template>
	<router-link
		to="#"
		class="flex items-start gap-10 border-y border-slate-700 px-2 py-4 transition-colors hover:bg-slate-700"
	>
		<div class="flex flex-shrink-0 items-center gap-3">
			<profile-avatar>
				{{ profileName[0] }}
			</profile-avatar>

			<div>
				<router-link
					class="hover:text-primary-400 hover:underline"
					to="#efdewf"
				>
					{{ profileName }}
				</router-link>

				<p class="text-xs font-medium text-slate-500">
					{{ date }}
				</p>
			</div>
		</div>

		<div>
			<h2 class="mb-5">
				{{ jobName }}
			</h2>

			<p>
				{{ jobDescription }}
			</p>
		</div>
	</router-link>
</template>

<script setup lang="ts">
import ProfileAvatar from "@/components/base/ProfileAvatar.vue";

interface Props {
	profileName: string;
	date: string;
	jobName: string;
	jobDescription: string;
}

defineProps<Props>();
</script>

<style scoped></style>
