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
		return response.data;
	},
	async (error) => {
		if (error.response) {
			retryCount = 0;
		}
		return Promise.reject(error);
	}
);
