export interface LoginError {
	error: string;
	code: string;
}

export const isLoginError = (e: unknown): e is LoginError =>
	"error" in e && "code" in e;
