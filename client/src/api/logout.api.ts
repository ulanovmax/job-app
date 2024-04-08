import axios from "@/api/axios.api.ts";
import { throwError } from "@/api/throw-error.api.ts";

export interface LoginInput {
	email: string;
	password: string;
}

interface LoginResponse {
	accessToken: string;
}

export const logoutAuth = async () => {
	try {
		const res = await axios.post<LoginResponse>("/logout");

		return res.data;
	} catch (e) {
		throwError(e);
	}
};
