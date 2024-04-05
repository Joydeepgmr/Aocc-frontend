import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Get, Post, Patch } from '../../../HttpServices/HttpServices';

export const usePostBaggageBelt = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: [''],
		mutationFn: async (data) => await Post(``, data),
		onSuccess: () => {
			queryClient.invalidateQueries('');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useGetBaggageBelt = (props) => {
	const response = useQuery({
		queryKey: [''],
		queryFn: async () => await Get(``),
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
