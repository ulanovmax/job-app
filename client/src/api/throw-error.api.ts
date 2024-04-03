import { isAxiosError } from "axios";

export const throwError = (err: unknown) => {
	if (isAxiosError(err)) {
		throw err.response?.data;
	} else {
		throw err
	}
}