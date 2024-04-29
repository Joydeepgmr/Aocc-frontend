import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import {
	UPDATE_FIDS_RESOURCES,
	DELETE_FIDS_RESOURCES,
	GET_BAGGAGE_BELT,
	GET_CHECKIN_COUNTER,
	GET_FIDS_RESOURCES,
	GET_TERMINAL,
	POST_FIDS_RESOURCES,
} from '../../api';
import { Post, Delete, Patch } from '../HttpServices/HttpServices';

export const useCheckInDropdown = (props) => {
	const response = useQuery({
		queryKey: ['check-in-dropdown'],
		queryFn: async () => await Post(`${GET_CHECKIN_COUNTER}?bulk=true`),
		...props,
		enabled: false,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};

export const useTerminalDropdown = (props) => {
	const response = useQuery({
		queryKey: ['terminal-dropdown'],
		queryFn: async () => await Post(`${GET_TERMINAL}?bulk=true`),
		...props,
		enabled: false,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};

export const useBaggageBeltDropdown = (props) => {
	const response = useQuery({
		queryKey: ['baggage-belt-dropdown'],
		queryFn: async () => await Post(`${GET_BAGGAGE_BELT}?bulk=true`),
		...props,
		enabled: false,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};

export const useGetAllFidsResources = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-all-fids-resources'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_FIDS_RESOURCES}`, { pagination }),
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

export const usePostFidsResource = (props) => {
	const response = useMutation({
		mutationKey: ['post-fids-resource'],
		mutationFn: async (data) => await Post(`${POST_FIDS_RESOURCES}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : data?.error;

	return { ...response, data, message: statusMessage };
};

export const useDeleteFidsResource = (props) => {
	const response = useMutation({
		mutationKey: ['delete-fids-resource'],
		mutationFn: async (id) => await Delete(`${DELETE_FIDS_RESOURCES}/${id}`),
		...props,
	});
	return response;
};

export const useUpdateFidsResource = (id, props) => {
	const response = useMutation({
		mutationKey: ['update-fids-resource', id],
		mutationFn: async (data) => await Patch(`${UPDATE_FIDS_RESOURCES}/${id}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : data?.error;

	return { ...response, data, message: statusMessage };
};
