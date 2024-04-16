<template>
	<form class="w-full space-y-4" @submit.prevent>
		<div class="grid grid-cols-2 gap-4">
			<fieldset class="field">
				<label for="name">Enter your company name</label>
				<InputText
					id="name"
					v-model="state.name"
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

		<Button
			label="Sign in"
			:loading="loading"
			class="w-full"
			type="submit"
			@click="handleSubmit"
		/>
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { FetchResult } from "@apollo/client";
import { useMutation } from "@vue/apollo-composable";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Textarea from "primevue/textarea";
import { useToast } from "primevue/usetoast";

import SearchCountries from "@/components/base/SearchCountries.vue";

import { CREATE_COMPANY } from "@/apollo/gql/mutations/company.mutation.ts";
import type { CreateCompanyInput } from "@/ts/types/company";

const router = useRouter();
const toast = useToast();

const initialState: CreateCompanyInput = {
	name: "",
	email: "",
	country: "",
	employees: 0,
	password: "",
	description: undefined,
};

const state = ref<CreateCompanyInput>({ ...initialState });
const repeatPassword = ref("");

const { mutate: createCompany, loading } = useMutation(CREATE_COMPANY, {
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

			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Your account is successfully created",
				closable: true,
				life: 3000,
			});

			void router.push({ name: "login" });
		}
	} catch (e) {
		toast.add({
			severity: "error",
			summary: "Register Error",
			detail: "Couldn't register your account",
			closable: true,
			life: 3000,
		});
	}
};
</script>

<style scoped></style>
