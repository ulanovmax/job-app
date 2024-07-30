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
		</div>

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

		<fieldset class="field">
			<label for="experience"> Tell about your experience </label>

			<Textarea
				id="experience"
				v-model="state.experience"
				rows="5"
				cols="30"
			/>
		</fieldset>

		<Button
			:loading="loading"
			label="Sign in"
			class="w-full"
			type="submit"
			@click="handleSubmit"
		/>
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import type { FetchResult } from "@apollo/client";
import { useMutation } from "@vue/apollo-composable";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Textarea from "primevue/textarea";

import type { CandidateCreateInput } from "@/apollo/generated/graphql.ts";
import { CREATE_CANDIDATE } from "@/apollo/gql/mutations/candidate.mutation.ts";
import { langLevels } from "@/constants/langLevels.ts";

const toast = useToast();
const router = useRouter();

const initialState: CandidateCreateInput = {
	name: "",
	email: "",
	years: 0,
	englishLevel: "",
	password: "",
	experience: "",
};

const state = ref<CandidateCreateInput>({ ...initialState });
const repeatPassword = ref("");

const { mutate: createCompany, loading } = useMutation(CREATE_CANDIDATE, {
	errorPolicy: "all",
});

const handleSubmit = async () => {
	try {
		const response: FetchResult | null = await createCompany({
			input: { ...state.value },
		});

		if (response) {
			if (response.errors) {
				throw response.errors;
			}

			toast.success("Your account is successfully created");

			void router.push({ name: "login" });
		}
	} catch (e) {
		toast.error("Couldn't register your account");
	}
};
</script>

<style scoped></style>
