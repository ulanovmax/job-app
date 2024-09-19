<template>
	<v-header class="mb-10" />

	<main class="mb-10 flex-grow pb-10">
		<div class="container">
			<router-view></router-view>
		</div>
	</main>

	<v-footer />
</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";

import VFooter from "@/components/layout/VFooter.vue";
import VHeader from "@/components/layout/VHeader.vue";

import { storeToRefs } from "pinia";

import type { GetResponsesQuery } from "@/apollo/generated/graphql.ts";
import { GET_RESPONSES } from "@/apollo/gql/queries/responses.query.ts";
import { SUBSCRIBE_RESPONSES } from "@/apollo/gql/subscriptions/responses.subscription.ts";
import { useAuthStore } from "@/store/auth.store.ts";
import { useInboxStore } from "@/store/inbox.store.ts";

const { checkProfileAuth } = useAuthStore();
const { responses, showLabel } = storeToRefs(useInboxStore());

void checkProfileAuth();

const { result, subscribeToMore, onResult } = useQuery<GetResponsesQuery>(
	GET_RESPONSES,
	{},
	{
		fetchPolicy: "network-only",
	}
);

subscribeToMore({
	document: SUBSCRIBE_RESPONSES,
	updateQuery: (previousQueryResult, { subscriptionData }) => {
		if (subscriptionData.data.responseAdded) {
			responses.value.unshift(subscriptionData.data.responseAdded);
			showLabel.value = true;
		}
	},
});

onResult(() => {
	if (result.value) {
		responses.value = [...result.value.responses];
	}
});
</script>

<style scoped lang="postcss"></style>
