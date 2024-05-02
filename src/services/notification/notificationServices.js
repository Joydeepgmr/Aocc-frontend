import { useInfiniteQuery, useMutation } from 'react-query';
import { GET_ALL_NOTIFICATION, UPDATE_NOTIFICATION } from '../../api';
import { Patch, Post } from '../HttpServices/HttpServices';

export const useGetAllNotification = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-all-notification'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_ALL_NOTIFICATION}`, { pagination }),
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

export const useUpdateNotification = (props) => {
	const response = useMutation({
		mutationKey: ['update-notification'],
		mutationFn: async (data) => await Patch(`${UPDATE_NOTIFICATION}/${data?.id}?status=${data?.status}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : data?.error;

	return { ...response, data, message: statusMessage };
};
