import Cookies from "js-cookie";

export const useSetCookies = (name: string, value: string) => {
	Cookies.set(name, value, {
		expires: 7,
		path: "",
		secure: true,
		sameSite: "lax",
	});
};
