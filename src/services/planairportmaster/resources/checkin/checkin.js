import { useMutation, useInfiniteQuery } from 'react-query';
import { CHECKIN_COUNTER,GET_CHECKIN_COUNTER } from '../../../../api';
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetCheckIn = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-check-in'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_CHECKIN_COUNTER}`,{pagination}),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) { return lastPage?.data?.paginated }
			return false;
		},
		...props,
	});

	return response;
};

export const usePostCheckIn = (props) => {
	const response = useMutation({
		mutationKey: ['post-check-in'],
		mutationFn: async (data) => await Post(`${CHECKIN_COUNTER}`, data),
		...props,
	});

	return response;
};

export const useEditCheckin = (id,props) => {
	const response = useMutation({
		mutationKey: ['edit-checkin'],
		mutationFn: async (data) => await Patch(`${CHECKIN_COUNTER}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteCheckin = (props) => {
	const response = useMutation({
		mutationKey: ['delete-checkin'],
		mutationFn: async (id) => await Delete(`${CHECKIN_COUNTER}/${id}`),
		...props,
	});
	return response;
};
