import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PARKING_STAND } from '../../../../api';
import { Get, Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetParkingStand = (props) => {
	const response = useQuery({
		queryKey: ['get-parking-stand'],
		queryFn: async () => await Get(`${PARKING_STAND}`),
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

export const usePostParkingStand = (props) => {
	const response = useMutation({
		mutationKey: ['post-parking-stand'],
		mutationFn: (data) => Post(`${PARKING_STAND}`, data),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useEditParkingStand = (props) => {
	const response = useMutation({
		mutationKey: ['edit-parking-stand'],
		mutationFn: (data) => Patch(`${PARKING_STAND}`, data),
		...props,
	});

	return response;
};

export const useDeleteParkingStand = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['delete-parking-stand'],
		mutationFn: (id) => Delete(`${PARKING_STAND}/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries('get-parking-stand');
		},
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.data?.message
		: error?.message;

	return { ...response, data: data?.data, message: statusMessage };
};
