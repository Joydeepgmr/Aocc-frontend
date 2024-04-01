import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CHECKIN_COUNTER } from '../../../../api';
import { Get, Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetCheckIn = (props) => {
	const response = useQuery({
		queryKey: ['get-check-in'],
		queryFn: async () => await Get(`${CHECKIN_COUNTER}`),
		...props,
	});

	return response;
};

export const usePostCheckIn = (props) => {
	const response = useMutation({
		mutationKey: ['post-check-in'],
		mutationFn: (data) => Post(`${CHECKIN_COUNTER}`, data),
		...props,
	});

	return response;
};

export const useEditCheckin = (id,props) => {
	const response = useMutation({
		mutationKey: ['edit-checkin'],
		mutationFn: (data) => Patch(`${CHECKIN_COUNTER}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteCheckin = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['delete-checkin'],
		mutationFn: (id) => Delete(`${CHECKIN_COUNTER}/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries('get-check-in');
		},
		...props,
	});
	return response;
};
