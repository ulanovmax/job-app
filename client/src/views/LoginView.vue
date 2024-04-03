<template>
	<main>
		<section class="flex min-h-screen items-center justify-center">
			<div class="container flex w-full flex-col items-center">
				<h1 class="mb-3">Login</h1>
				<p class="mb-5">Please login to continue to your account</p>

				<form
					class="w-full max-w-sm space-y-4"
					@submit.prevent="handleSubmit"
				>
					<fieldset class="field">
						<label for="title">Type your email</label>
						<InputText
							id="title"
							v-model="state.email"
							placeholder="Email"
						/>
					</fieldset>

					<fieldset class="field">
						<label for="title">Type your password</label>
						<Password
							v-model="state.password"
							placeholder="Password"
							:feedback="false"
							toggle-mask
						/>
					</fieldset>

					<Button label="Sign in" class="w-full" type="submit" />
				</form>
			</div>
		</section>

		<Toast position="bottom-right" />
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

import type { LoginInput } from "@/api/login.api.ts";
import { useAuthStore } from "@/store/auth.store.ts";

const toast = useToast();

const authStore = useAuthStore();

const initialState: LoginInput = {
	email: "",
	password: "",
};

const state = ref<LoginInput>({ ...initialState });

const handleSubmit = async () => {
	try {
		await authStore.login(state.value);
	} catch (e) {
		toast.add({
			severity: "error",
			summary: "Login Error",
			detail: "Couldn't find your account",
			closable: true,
			life: 3000,
		});
	}
};
</script>

<style scoped lang="postcss"></style>
