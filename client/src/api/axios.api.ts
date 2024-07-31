import type { AxiosError } from "axios";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000";

axios.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

axios.defaults.withCredentials = true;

export default axios;
