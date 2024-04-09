import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import {
	BULK_UPLOAD_GLOBAL_AIRCRAFT_TYPE,
	BULK_UPLOAD_GLOBAL_AIRLINE,
	BULK_UPLOAD_GLOBAL_AIRPORT,
	DELETE_GLOBAL_AIRCRAFT_REGISTRATION,
	DELETE_GLOBAL_AIRCRAFT_TYPE,
	DELETE_GLOBAL_AIRLINE,
	DELETE_GLOBAL_AIRPORT,
	GET_COUNTRY_DATA,
	GET_GLOBAL_AIRCRAFT_REGISTRATION,
	GET_GLOBAL_AIRCRAFT_TYPE,
	GET_GLOBAL_AIRLINE,
	GET_GLOBAL_AIRPORT,
	PATCH_GLOBAL_AIRCRAFT_REGISTRATION,
	PATCH_GLOBAL_AIRCRAFT_TYPE,
	PATCH_GLOBAL_AIRLINE,
	PATCH_GLOBAL_AIRPORT,
	POST_BULK_GLOBAL_AIRCRAFT_TYPE,
	POST_BULK_GLOBAL_AIRPORT,
	POST_GLOBAL_AIRCRAFT_REGISTRATION,
	POST_GLOBAL_AIRCRAFT_TYPE,
	POST_GLOBAL_AIRLINE,
	POST_GLOBAL_AIRPORT,
} from '../../api/endpoints';

import { Delete, Get, Patch, Post } from '../HttpServices/HttpServices';
import { DownloadFileByUrl, GenerateDownloadUrl } from '../../utils';

export const useGetGlobalAirport = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['global-airport'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_GLOBAL_AIRPORT}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		...props,
	});
	return { ...response };
};
export const usePostGlobalAirport = (props) => {
	const response = useMutation({
		mutationKey: ['post-global-airport'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRPORT}`, props),
		...props,
	});
	return { ...response };
};
export const usePatchGlobalAirport = (props) => {
	const response = useMutation({
		mutationKey: ['patch-global-airport'],
		mutationFn: async (payload) => await Patch(`${PATCH_GLOBAL_AIRPORT}${payload.id}`, payload.values),
		...props,
	});

	return { ...response };
};
export const useDeleteGlobalAirport = (props) => {
	const response = useMutation({
		mutationKey: ['delete-global-airport'],
		mutationFn: async (id) => await Delete(`${DELETE_GLOBAL_AIRPORT}${id}`),
		...props,
	});
	return { ...response };
};
export const useGlobalAirportDropdown = (props) => {
	const response = useQuery({
		queryKey: ['post-global-airport'],
		queryFn: async () => await Post(`${GET_GLOBAL_AIRPORT}?bulk=true`),
		...props,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};

export const useGetGlobalAirline = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['global-airline'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_GLOBAL_AIRLINE}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		...props,
	});
	return { ...response };
};
export const usePostGlobalAirline = (props) => {
	const response = useMutation({
		mutationKey: ['post-global-airline'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRLINE}`, props),
		...props,
	});
	return { ...response };
};
export const usePatchGlobalAirline = (props) => {
	const response = useMutation({
		mutationKey: ['patch-global-airline'],
		mutationFn: async (payload) => await Patch(`${PATCH_GLOBAL_AIRLINE}`, payload),
		...props,
	});
	return { ...response };
};
export const useDeleteGlobalAirline = (props) => {
	const response = useMutation({
		mutationKey: ['delete-global-airline'],
		mutationFn: async (id) => await Delete(`${DELETE_GLOBAL_AIRLINE}${id}`),
		...props,
	});
	return { ...response };
};
export const useGlobalAirlineDropdown = (props) => {
	const response = useQuery({
		queryKey: ['global-airline-dropdown'],
		queryFn: async () => await Post(`${GET_GLOBAL_AIRLINE}?bulk=true`),
		...props,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};

export const useGetGlobalAircraftType = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['global-aircraft-type'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_GLOBAL_AIRCRAFT_TYPE}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		...props,
	});
	return { ...response };
};
export const usePostGlobalAircraftType = (props) => {
	const response = useMutation({
		mutationKey: ['post-global-aircraft-type'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_TYPE}`, props),
		...props,
	});
	return { ...response };
};
export const usePatchGlobalAircraftType = (props) => {
	const response = useMutation({
		mutationKey: ['patch-global-aircraft-type'],
		mutationFn: async (payload) => await Patch(`${PATCH_GLOBAL_AIRCRAFT_TYPE}${payload.id}`, payload.values),
		...props,
	});

	return { ...response };
};
export const useDeleteGlobalAircraftType = (props) => {
	const response = useMutation({
		mutationKey: ['delete-global-aircraft-type'],
		mutationFn: async (id) => await Delete(`${DELETE_GLOBAL_AIRCRAFT_TYPE}${id}`),
		...props,
	});
	return { ...response };
};
export const useGlobalAircraftTypeDropdown = (props) => {
	const response = useQuery({
		queryKey: ['global-aircraft-type-dropdown'],
		queryFn: async () => await Post(`${GET_GLOBAL_AIRCRAFT_TYPE}?bulk=true`),
		...props,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};
export const useGetGlobalAircraftRegistration = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['global-aircraft-registration'],
		queryFn: async ({ pageParam: pagination = {} }) =>
			await Post(`${GET_GLOBAL_AIRCRAFT_REGISTRATION}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		...props,
	});
	return { ...response };
};
export const usePostGlobalAircraftRegistration = (props) => {
	const response = useMutation({
		mutationKey: ['post-global-aircraft-registration'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRCRAFT_REGISTRATION}`, props),
		...props,
	});
	return { ...response };
};
export const usePatchGlobalAircraftRegistration = (props) => {
	const response = useMutation({
		mutationKey: ['patch-global-aircraft-registration'],
		mutationFn: async (payload) => await Patch(`${PATCH_GLOBAL_AIRCRAFT_REGISTRATION}`, payload),
		...props,
	});

	return { ...response };
};
export const useDeleteGlobalAircraftRegistration = (props) => {
	const response = useMutation({
		mutationKey: ['delete-global-aircraft-registration'],
		mutationFn: async (id) => await Delete(`${DELETE_GLOBAL_AIRCRAFT_REGISTRATION}${id}`),
		...props,
	});
	return { ...response };
};
export const useCountriesDropdown = (props) => {
	const response = useQuery({
		queryKey: ['get-countries'],
		queryFn: async () => await Get(`${GET_COUNTRY_DATA}`),
		...props,
	});
	return { ...response };
};

export const useGlobalAirport = (props) => {
	const queryClient = useQueryClient();
	// for get all airport
	const getGlobalAirport = useMutation({
		mutationKey: ['global-airport'],
		mutationFn: async (props) => await Post(`${GET_GLOBAL_AIRPORT}`, props),
		onSuccess: (newData) => {
			const previousData = queryClient.getQueryData('global-airport') || [];
			const updatedData = [...previousData, ...newData.data];
			queryClient.setQueryData('global-airport', updatedData);
		},
		onError: ({
			response: {
				data: { message },
			},
		}) => {
			queryClient.setQueryData('airport-error', message);
		},
		...props,
	});
	//for delete an airport
	const updatedData = queryClient.getQueryData('global-airport') || [];
	const successMessage = queryClient.getQueryData('airport-success');
	const errorMessage = queryClient.getQueryData('airport-error');

	return {
		getGlobalAirport,
		updatedData,
		successMessage,
		errorMessage,
	};
};

export const useUploadCSVAirport = (props) => {
	const response = useMutation({
		mutationKey: ['global-airport/upload'],
		mutationFn: (data) =>
			Post(`${POST_BULK_GLOBAL_AIRPORT}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useUploadCSVAircraftType = (props) => {
	const response = useMutation({
		mutationKey: ['global-aircraft-type/upload'],
		mutationFn: (data) =>
			Post(`${POST_BULK_GLOBAL_AIRCRAFT_TYPE}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useGlobalCountries = (props) => {
	const queryClient = useQueryClient();
	const getGlobalCountries = useMutation({
		mutationKey: ['get-country-data'],
		mutationFn: async () => await Get(`${GET_COUNTRY_DATA}`),
		onSuccess: (data) => {
			queryClient.setQueryData('country-data', data); // Set the data in the cache
		},
		...props,
	});
	const countryData = queryClient.getQueryData('country-data') || [];
	return { getGlobalCountries, countryData };
};

export const useUploadCSVGlobalAirline = (props) => {
	const response = useMutation({
		mutationKey: ['upload-csv-global-airline'],
		mutationFn: async (data) => {
			const resp = await Post(`${BULK_UPLOAD_GLOBAL_AIRLINE}`, data);
			const downloadUrl = GenerateDownloadUrl(resp);
			DownloadFileByUrl(downloadUrl);
			return resp;
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useUploadCSVGlobalAircraftType = (props) => {
	const response = useMutation({
		mutationKey: ['upload-csv-global-aircraft-type'],
		mutationFn: async (data) => {
			const resp = await Post(`${BULK_UPLOAD_GLOBAL_AIRCRAFT_TYPE}`, data);
			const downloadUrl = GenerateDownloadUrl(resp);
			DownloadFileByUrl(downloadUrl);
			return resp;
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useUploadCSVGlobalAirport = (props) => {
	const response = useMutation({
		mutationKey: ['upload-csv-global-airport'],
		mutationFn: async (data) => {
			const resp = await Post(`${BULK_UPLOAD_GLOBAL_AIRPORT}`, data);
			const downloadUrl = GenerateDownloadUrl(resp);
			DownloadFileByUrl(downloadUrl);
			return resp;
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};
