import type { LoginError } from "@/ts/types/error";

export const isLoginError = (e: unknown): e is LoginError => {
	return typeof e === "object" && e !== null && "error" in e && "code" in e;
};
