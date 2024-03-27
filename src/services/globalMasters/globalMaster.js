import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
	GET_GLOBAL_AIRPORT,
	POST_GLOBAL_AIRPORT,
	EDIT_GLOBAL_AIRPORT,
	DELETE_GLOBAL_AIRPORT,
	GET_GLOBAL_AIRCRAFT_TYPE,
	POST_GLOBAL_AIRCRAFT_TYPE,
	POST_BULK_GLOBAL_AIRCRAFT_TYPE,
	GET_GLOBAL_AIRCRAFT_REGISTRATION,
	POST_GLOBAL_AIRCRAFT_REGISTRATION,
	GET_GLOBAL_AIRLINE,
	POST_GLOBAL_AIRLINE,
	PATCH_GLOBAL_AIRLINE,
	DELETE_GLOBAL_AIRLINE,
} from '../../api/endpoints';

import { Get, Post, Patch, Delete } from '../HttpServices/HttpServices';

export const useGetGlobalAirport = (props) => {
	const response = useQuery({
		queryKey: ['global-airport'],
		queryFn: async () => await Get(`${GET_GLOBAL_AIRPORT}`),
		...props,
	});

	const { data, error, isSuccess } = response;

	console.log(response);

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};

export const usePostGlobalAirport = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['post-global-airport'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRPORT}`, props),
		onSuccess: () => {
			queryClient.invalidateQueries('global-airport');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useEditGlobalAirport = (id, props) => {
	const response = useMutation({
		mutationKey: ['edit-global-airport'],
		mutationFn: (data) => Patch(`${EDIT_GLOBAL_AIRPORT}/${id}`, data),
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useDeleteGlobalAirport = (id) => {
	const response = useMutation({
		mutationKey: ['delete-user', id],
		mutationFn: () => Delete(`${DELETE_GLOBAL_AIRPORT}/${id}`),
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.data?.message : error?.response?.data?.message;

	return { ...response, data: data?.payload?.data, message: statusMessage };
};

export const useGetGlobalAircraftType = (props) => {
	const response = useQuery({
		queryKey: ['global-aircraft-type'],
		queryFn: async () => await Get(`${GET_GLOBAL_AIRCRAFT_TYPE}`),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};

export const usePostGlobalAircraftType = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['post-global-aircraft-type'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_TYPE}`, props),
		onSuccess: () => {
			queryClient.invalidateQueries('global-aircraft-type');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useUploadCSVAircraftType = (props) => {
	const response = useMutation({
		mutationKey: ['global-aircraft-type/upload'],
		mutationFn: (data) => Post(`${POST_BULK_GLOBAL_AIRCRAFT_TYPE}`, data),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useGetGlobalAircraftRegistration = (props) => {
	const response = useQuery({
		queryKey: ['global-aircraft-register'],
		queryFn: async () => await Get(`${GET_GLOBAL_AIRCRAFT_REGISTRATION}`),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};

export const usePostGlobalAircraftRegistration = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['post-global-aircraft-register'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_REGISTRATION}`, props),
		onSuccess: () => {
			queryClient.invalidateQueries('global-aircraft-register');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useGetGlobalAirline = (props) => {
	const response = useMutation({
		mutationKey: ['global-airline'],
		mutationFn: async () => await Post(`${GET_GLOBAL_AIRLINE}`),
		...props,
	});

	const { data, error, isSuccess } = response;

	console.log(response);

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};

export const usePostGlobalAirline = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['post-global-airline'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRLINE}`, props),
		onSuccess: () => {
			queryClient.invalidateQueries('global-airline');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const usePatchGlobalAirline = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['patch-global-airline'],
		mutationFn: async (props) => await Patch(`${PATCH_GLOBAL_AIRLINE}`, props),

		onSuccess: () => {
			queryClient.invalidateQueries('global-airline');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useDeleteGlobalAirline = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['delete-global-airline'],
		mutationFn: async (props) => await Delete(`${DELETE_GLOBAL_AIRLINE}`, props),

		onSuccess: () => {
			queryClient.invalidateQueries('global-airline');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};
