import { axiosInstance } from '../../interceptor/interceptor';

export const Get = async (url, config) => {
	const response = await axiosInstance.get(url, config);
	return response.data;
};

export const Post = async (url, data, config) => {
	const response = await axiosInstance.post(url, data, config);
	return response;
};

export const Delete = async (url, config) => {
	const response = await axiosInstance.delete(url, config);
	return response;
};

export const Put = async (url, data, config) => {
	const response = await axiosInstance.put(url, data, config);
	return response;
};

export const Patch = async (url, data, config) => {
	const response = await axiosInstance.patch(url, data, config);
	return response;
};
