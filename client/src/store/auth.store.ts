// import { ref } from "vue";
import Cookies from "js-cookie";

import { defineStore } from "pinia";

import type { LoginInput } from "@/api/login.api.ts";
import { loginAuth } from "@/api/login.api.ts";
import { throwError } from "@/api/throw-error.api.ts";

export const useAuthStore = defineStore("authStore", () => {
	const getAccessToken = () => Cookies.get("accessToken");

	const login = async (input: LoginInput) => {
		try {
			await loginAuth(input);
		} catch (e) {
			throwError(e);
		}
	};

	return {
		getAccessToken,
		login,
	};
});
