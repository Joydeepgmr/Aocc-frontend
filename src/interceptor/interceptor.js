import Axios from 'axios';
import { localStorageKey } from '../keys';

let retryCount = 0;

export const axiosInstance = Axios.create({
	baseURL: process.env.baseURL,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem(localStorageKey.AUTH_TOKEN);

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	async (response) => {
		if (response.config.method.toUpperCase() !== 'GET' && response.data && response.data.message) {
			// alert(response.data.message); // Display message from response if it's not a GET request
		}
		return response.data;
	},
	async (error) => {
		if (error.response) {
			const errorMessage = error.response.data.message || 'Something went wrong';
			// alert(errorMessage); // Display error message in alert
			retryCount = 0;
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
