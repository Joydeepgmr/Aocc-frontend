import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CHECKIN_COUNTER } from '../../../../api';
import { Get, Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetCheckIn = (props) => {
	const response = useQuery({
		queryKey: ['get-check-in'],
		queryFn: async () => await Get(`${CHECKIN_COUNTER}`),
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

export const usePostCheckIn = (props) => {
	const response = useMutation({
		mutationKey: ['post-check-in'],
		mutationFn: async (data) => await Post(`${CHECKIN_COUNTER}`, data),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useEditCheckin = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['edit-checkin'],
		mutationFn: (data) => Patch(`${CHECKIN_COUNTER}`, data),
		onSuccess: () => {
			queryClient.invalidateQueries('get-check-in');
		},
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.data?.message
		: error?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useDeleteCheckin = (id,props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['delete-checkin'],
		mutationFn: (id) => Delete(`${CHECKIN_COUNTER}/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries('get-check-in');
		},
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.data?.message
		: error?.message;

	return { ...response, data: data?.data, message: statusMessage };
};
