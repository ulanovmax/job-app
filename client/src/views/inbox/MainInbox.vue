<template>
	<section v-if="route.name === 'inbox'">
		<h1 class="mb-10">Inbox</h1>

		<ul v-if="responses.length">
			<li v-for="response in responses" :key="response.id">
				<inbox-item
					:to="{ name: 'inboxView', params: { id: response.id } }"
					:profile-name="response.candidate.name"
					:date="response.dateCreated"
					:job-name="response.job.title"
					:message="response.message"
				/>
			</li>
		</ul>

		<div v-else class="mt-10 text-center opacity-50">
			<i class="pi pi-envelope text-3xl"></i>
			<p class="mt-3 text-xl">You have no responses</p>
		</div>
	</section>

	<router-view v-else></router-view>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import InboxItem from "@/components/inbox/InboxItem.vue";

import { storeToRefs } from "pinia";

import { useInboxStore } from "@/store/inbox.store.ts";

const { showLabel, responses } = storeToRefs(useInboxStore());

const route = useRoute();

showLabel.value = false;
</script>

<style scoped></style>
