<template>
	<form class="w-full space-y-4" @submit.prevent>
		<div class="grid grid-cols-2 gap-4">
			<fieldset class="field">
				<label for="fullName">Enter your full name</label>
				<InputText
					id="fullName"
					v-model="state.name"
					placeholder="Michael Jackson"
				/>
			</fieldset>

			<fieldset class="field">
				<label for="candidateEmail"> Enter your email </label>
				<InputText
					id="candidateEmail"
					v-model="state.email"
					placeholder="example@mail.com"
				/>
			</fieldset>
		</div>

		<fieldset class="field">
			<label for="years"> Select years of experience </label>
			<InputNumber
				v-model="state.years"
				input-id="years"
				:use-grouping="false"
				suffix=" years"
			/>
		</fieldset>

		<fieldset class="field">
			<label for="englishLevel">Select your English level</label>
			<Dropdown
				v-model="state.englishLevel"
				input-id="englishLevel"
				:options="langLevels"
				show-clear
				placeholder="English level"
				class="w-full"
			/>
		</fieldset>

		<fieldset class="field">
			<label for="candidatePassword">Create password</label>
			<Password
				v-model="state.password"
				input-id="candidatePassword"
				placeholder="********"
				:feedback="false"
				toggle-mask
			/>
		</fieldset>

		<fieldset class="field">
			<label for="candidateRepeatPassword">Repeat your password</label>
			<Password
				v-model="repeatPassword"
				input-id="candidateRepeatPassword"
				placeholder="********"
				:feedback="false"
				toggle-mask
			/>
		</fieldset>

		<Button label="Sign in" class="w-full" type="submit" />
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

import { langLevels } from "@/constants/langLevels.ts";

const initialState = {
	name: "",
	email: "",
	years: 0,
	englishLevel: "",
	password: "",
	description: "",
	country: "",
};

const state = ref({ ...initialState });
const repeatPassword = ref("");
</script>

<style scoped></style>
