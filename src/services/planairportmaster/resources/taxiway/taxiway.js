import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TAXIWAY } from '../../../../api';
import { Get, Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetTaxiway = (props) => {
	const response = useQuery({
		queryKey: ['get-taxiway'],
		queryFn: async () => await Get(`${TAXIWAY}`),
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

export const usePostTaxiway = (props) => {
	const response = useMutation({
		mutationKey: ['post-taxiway'],
		mutationFn: (data) => Post(`${TAXIWAY}`, data),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useEditTaxiway = (props) => {
	const response = useMutation({
		mutationKey: ['edit-taxiway'],
		mutationFn: (data) => Patch(`${TAXIWAY}`, data),
		...props,
	});

	return response;
};

export const useDeleteTaxiway = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['delete-taxiway'],
		mutationFn: (id) => Delete(`${TAXIWAY}/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries('get-taxiway');
		},
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.data?.message
		: error?.message;

	return { ...response, data: data?.data, message: statusMessage };
};
