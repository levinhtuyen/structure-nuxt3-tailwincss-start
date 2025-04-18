import axios from "axios";
import { getLocalStorageWithExpiry } from "@/api/localStorage";
const apiCaller = axios.create({
	baseURL: "",
	// timeout: 10000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});
// req
apiCaller.interceptors.request.use(
	function (config) {
		const token = getLocalStorageWithExpiry("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);
// res
apiCaller.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		localStorage.removeItem("current-page");
		return error.response;
	},
);

export default apiCaller;
