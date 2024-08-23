<template>
	<section>
		<h1 class="mb-10">Inbox</h1>

		<ul>
			<li class="">
				<chat-item
					profile-name="Gotoinc"
					:date="new Date().toDateString()"
					job-name="Frontend Engineer"
					job-description="Test"
				/>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import ChatItem from "@/components/inbox/ChatItem.vue";
</script>

<style scoped></style>
