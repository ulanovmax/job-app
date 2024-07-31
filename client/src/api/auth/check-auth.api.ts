import axios from "@/api/axios.api.ts";
import { throwError } from "@/api/throw-error.api.ts";

interface Response {
	success: boolean;
	error?: string;
}

export const checkAuth = async () => {
	try {
		const res = await axios.post<Response>("/auth");

		return res.data;
	} catch (e) {
		throwError(e);
	}
};
