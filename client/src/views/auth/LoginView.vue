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
						<label for="email">Type your email</label>
						<InputText
							id="email"
							v-model="state.email"
							type="email"
							placeholder="Email"
						/>
					</fieldset>

					<fieldset class="field">
						<label for="password">Type your password</label>
						<Password
							v-model="state.password"
							autocomplete="current-password"
							input-id="password"
							placeholder="Password"
							:feedback="false"
							toggle-mask
						/>
					</fieldset>

					<Button
						:loading="isLoading"
						label="Sign in"
						class="w-full"
						type="submit"
					/>
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
import { useToast } from "vue-toastification";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

import type { LoginInput } from "@/api/auth/login.api.ts";
import { useAuthStore } from "@/store/auth.store.ts";
import { isLoginError } from "@/ts/guards/error.guard.ts";

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
			toast.error(e.error);
		} else {
			toast.error("Lost connection with the server");
		}
	} finally {
		isLoading.value = false;
	}
};
</script>

<style scoped lang="postcss"></style>
