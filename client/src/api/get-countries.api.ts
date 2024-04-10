import axios from "axios";

import { throwError } from "@/api/throw-error.api.ts";

export const getCountries = async (name: string, limit: number = 100) => {
	try {
		const res = await axios.get(
			`https://api.api-ninjas.com/v1/country?name=${name}&limit=${limit}`,
			{
				headers: {
					"X-Api-Key": process.env.COUNTRIES_API_KEY,
				},
			}
		);

		return res.data;
	} catch (err) {
		throwError(err);
	}
};
