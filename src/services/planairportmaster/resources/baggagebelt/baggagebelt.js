import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BAGGAGE_BELT } from '../../../../api';
import { Get, Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetBaggageBelt = (props) => {
	const response = useQuery({
		queryKey: ['get-baggage-belt'],
		queryFn: async () => await Get(`${BAGGAGE_BELT}`),
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
		mutationFn: (data) => Post(`${BAGGAGE_BELT}`, data),
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
		mutationFn: (data) => Patch(`${BAGGAGE_BELT}`, data),
		...props,
	});

	return response;
};

export const useDeleteBaggageBelt  = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['delete-baggage-belt'],
		mutationFn: (id) => Delete(`${BAGGAGE_BELT}/${id}`),
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
