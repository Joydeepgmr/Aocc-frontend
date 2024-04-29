import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import {
	BULK_IMPORT_PLANNER_AIRLINE,
	DELETE_PLANNER_AIRLINE,
	GET_AIRLINE_IMAGE,
	GET_PLANNER_AIRLINE,
	POST_PLANNER_AIRLINE,
	UPDATE_PLANNER_AIRLINE,
} from '../../api';
import { Delete, Patch, Post, Get } from '../HttpServices/HttpServices';
import { DownloadFileByUrl, GenerateDownloadUrl } from '../../utils';

export const useGetAllPlannerAirline = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-all-planner-airline'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_PLANNER_AIRLINE}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
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

export const usePostPlannerAirline = (props) => {
	const response = useMutation({
		mutationKey: ['post-planner-airline'],
		mutationFn: async (data) => await Post(`${POST_PLANNER_AIRLINE}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : data?.error;

	return { ...response, data, message: statusMessage };
};

export const useDeletePlannerAirline = (props) => {
	const response = useMutation({
		mutationKey: ['delete-planner-airline'],
		mutationFn: async (id) => await Delete(`${DELETE_PLANNER_AIRLINE}/${id}`),
		...props,
	});
	return response;
};

export const useUpdatePlannerAirline = (id, props) => {
	const response = useMutation({
		mutationKey: ['update-planner-airline', id],
		mutationFn: async (data) => await Patch(`${UPDATE_PLANNER_AIRLINE}/${id}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : data?.error;

	return { ...response, data, message: statusMessage };
};

export const useAirlineDropdown = (props) => {
	const response = useQuery({
		queryKey: ['get-airline-dropdown'],
		queryFn: async () => await Post(`${GET_PLANNER_AIRLINE}?bulk=true`),
		...props,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};

export const useUploadCSVPlannerAirline = (props) => {
	const response = useMutation({
		mutationKey: ['upload-csv-planner-airline'],
		mutationFn: async (data) => {
			const resp = await Post(`${BULK_IMPORT_PLANNER_AIRLINE}`, data);
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

export const useGetAirlineImage = (icao,props) => {
	const response = useQuery({
		queryKey: ['get-airline-image', icao],
		queryFn: async () => await Get(`${GET_AIRLINE_IMAGE}?icao=${icao}`),
		enabled: !!icao,
		...props,
	});

	return response;
};