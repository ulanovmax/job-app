<template>
	<main>
		<section class="mt-24">
			<div class="container flex w-full flex-col items-center">
				<h1 class="mb-5">Create account</h1>

				<TabMenu
					v-model:activeIndex="active"
					class="mb-5 w-full max-w-3xl overflow-x-visible overflow-y-visible"
					:model="items"
				/>

				<div class="mb-5 w-full max-w-3xl">
					<!-- Form for company  -->
					<register-company-form v-show="active === 0" />

					<!-- Form for candidate  -->
					<register-candidate-form v-show="active === 1" />
				</div>

				<p>
					Already have account?
					<router-link
						class="text-primary-400 hover:underline"
						:to="{ name: 'login' }"
					>
						Login
					</router-link>
				</p>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TabMenu from "primevue/tabmenu";

import RegisterCandidateForm from "@/components/forms/RegisterCandidateForm.vue";
import RegisterCompanyForm from "@/components/forms/RegisterCompanyForm.vue";

const active = ref(0);

const items = ref([
	{ label: "Company", icon: "pi pi-users" },
	{ label: "Candidate", icon: "pi pi-user" },
]);
</script>

<style scoped lang="postcss"></style>
