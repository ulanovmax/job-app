import Cookies from "js-cookie";

import { defineStore } from "pinia";

import type { LoginInput } from "@/api/login.api.ts";
import { loginAuth } from "@/api/login.api.ts";
import { logoutAuth } from "@/api/logout.api.ts";
import { throwError } from "@/api/throw-error.api.ts";
import router from "@/router";

export const useAuthStore = defineStore("authStore", () => {
	const getAccessToken = () => Cookies.get("accessToken");

	const login = async (input: LoginInput) => {
		try {
			const res = await loginAuth(input);

			if (res) {
				const { accessToken } = res;

				Cookies.set("accessToken", accessToken, {
					expires: 7,
					path: "",
					secure: true,
					sameSite: "lax",
				});
			}
		} catch (e) {
			throwError(e);
		}
	};

	const logout = async () => {
		try {
			await logoutAuth();

			Cookies.remove("accessToken");

			void router.replace({ name: "login" });
		} catch (e) {
			throwError(e);
		}
	};

	return {
		getAccessToken,
		login,
		logout,
	};
});
