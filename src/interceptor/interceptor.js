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
			// config.headers['ngrok-skip-browser-warning'] = true;
		}

		// Remove keys with null values from the request payload
		if (config.method.toUpperCase() !== 'GET' && config.data && typeof config.data === 'object' && !config?.url?.includes("bulk") && !config?.url?.includes("upload")) {
			config.data = removeNullValues(config.data);
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

// Utility function to remove keys with null values from an object
const removeNullValues = (obj) => {
	const newObj = {};
	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
			newObj[key] = obj[key];
		}
	}
	return newObj;
};

export default axiosInstance;
