<template>
	<main>
		<section class="flex min-h-screen items-center justify-center">
			<div class="container flex w-full flex-col items-center">
				<h1 class="mb-3">Login</h1>
				<p class="mb-5">Please login to continue to your account</p>

				<form
					class="mb-5 w-full max-w-sm space-y-4"
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

				<router-link
					class="text-primary-400 hover:underline"
					:to="{ name: 'register' }"
				>
					Create account
				</router-link>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { useToast } from "primevue/usetoast";

import type { LoginInput } from "@/api/login.api.ts";
import { useAuthStore } from "@/store/auth.store.ts";
import { isLoginError } from "@/ts/types/error.d.ts";

const toast = useToast();
const router = useRouter();

const authStore = useAuthStore();

const initialState: LoginInput = {
	email: "",
	password: "",
};

const state = ref<LoginInput>({ ...initialState });
const isLoading = ref(false);

const handleSubmit = async () => {
	isLoading.value = true;

	try {
		await authStore.login(state.value);

		void router.replace({ name: "main" });
	} catch (e) {
		if (isLoginError(e)) {
			if (e.code === "PASSWORD_NOT_CORRECT") {
				toast.add({
					severity: "error",
					summary: "Login Error",
					detail: "Password is not correct",
					closable: true,
					life: 3000,
				});
			} else {
				toast.add({
					severity: "error",
					summary: "Login Error",
					detail: "Couldn't find your account",
					closable: true,
					life: 3000,
				});
			}
		}
	} finally {
		isLoading.value = false;
	}
};
</script>

<style scoped lang="postcss"></style>
