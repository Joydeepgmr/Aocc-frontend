import { useMutation, useInfiniteQuery, useQueryClient } from 'react-query';
import { GET_BAGGAGE_BELT, BAGGAGE_BELT } from '../../../../api';
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetBaggageBelt = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-baggage-belt'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_BAGGAGE_BELT}`, {pagination}),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) { return lastPage?.pagination }
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

export const usePostBaggageBelt = (props) => {
	const response = useMutation({
		mutationKey: ['post-baggage-belt'],
		mutationFn: async(data) =>await Post(`${BAGGAGE_BELT}`, data),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useEditBaggageBelt  = (props) => {
	const response = useMutation({
		mutationKey: ['edit-baggage-belt'],
		mutationFn: async(data) =>await Patch(`${BAGGAGE_BELT}`, data),
		...props,
	});

	return response;
};

export const useDeleteBaggageBelt  = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['delete-baggage-belt'],
		mutationFn:async (id) =>await Delete(`${BAGGAGE_BELT}/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries('get-baggage-belt');
		},
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.data?.message
		: error?.message;

	return { ...response, data: data?.data, message: statusMessage };
};
