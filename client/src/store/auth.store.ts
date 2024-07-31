import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { defineStore } from "pinia";

import { checkAuth } from "@/api/auth/check-auth.api.ts";
import type { LoginInput } from "@/api/auth/login.api.ts";
import { loginAuth } from "@/api/auth/login.api.ts";
import { logoutAuth } from "@/api/auth/logout.api.ts";
import { throwError } from "@/api/throw-error.api.ts";
import router from "@/router";
import type { Token } from "@/ts/types/token";

export const useAuthStore = defineStore("authStore", () => {
	const getAccessToken = () => Cookies.get("accessToken");

	const getTokenInfo = () => {
		const token = getAccessToken();

		return token ? jwtDecode<Token>(token) : null;
	};

	const clearAuth = () => {
		Cookies.remove("accessToken");
		void router.replace({ name: "login" });
	};

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

			clearAuth();
		} catch (e) {
			throwError(e);
		}
	};

	const checkProfileAuth = async () => {
		try {
			const res = await checkAuth();

			if (res?.error) {
				clearAuth();
			}
		} catch (e) {
			// clearAuth();
			throwError(e);
		}
	};

	return {
		getAccessToken,
		getTokenInfo,
		checkProfileAuth,
		login,
		logout,
	};
});
