<template>
	<form class="w-full space-y-4" @submit.prevent>
		<div class="grid grid-cols-2 gap-4">
			<fieldset class="field">
				<label for="name">Enter your company name</label>
				<InputText
					id="name"
					v-model="state.email"
					placeholder="Company name"
				/>
			</fieldset>

			<fieldset class="field">
				<label for="email"> Enter your company email </label>
				<InputText
					id="email"
					v-model="state.email"
					placeholder="example@mail.com"
				/>
			</fieldset>

			<fieldset class="field">
				<label>Select your country</label>
				<SearchCountries v-model="state.country" />
			</fieldset>

			<fieldset class="field">
				<label for="employees"> Select amount of employees </label>
				<InputNumber
					v-model="state.employees"
					input-id="employees"
					:use-grouping="false"
					suffix=" employees"
				/>
			</fieldset>
		</div>

		<fieldset class="field">
			<label for="password">Create password</label>
			<Password
				v-model="state.password"
				input-id="password"
				placeholder="********"
				:feedback="false"
				toggle-mask
			/>
		</fieldset>

		<fieldset class="field">
			<label for="repeatPassword">Repeat your password</label>
			<Password
				v-model="repeatPassword"
				input-id="repeatPassword"
				placeholder="********"
				:feedback="false"
				toggle-mask
			/>
		</fieldset>

		<fieldset class="field">
			<label for="description"> Description (optional) </label>

			<Textarea
				id="description"
				v-model="state.description"
				rows="5"
				cols="30"
			/>
		</fieldset>

		<Button label="Sign in" class="w-full" type="submit" />
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Textarea from "primevue/textarea";

import SearchCountries from "@/components/base/SearchCountries.vue";

const initialState = {
	email: "",
	password: "",
	description: "",
	country: "",
	employees: 0,
};

const state = ref({ ...initialState });
const repeatPassword = ref("");
</script>

<style scoped></style>
