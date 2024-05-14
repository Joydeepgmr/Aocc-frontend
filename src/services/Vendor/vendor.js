import { useMutation, useInfiniteQuery } from 'react-query';
import { VENDOR, UPDATE_DONE } from '../../api';
import { Post, Patch, Get } from '../HttpServices/HttpServices';

export const useGetVendor = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-vendor'],
		queryFn: async ({ pageParam: pagination = {} }) => await Get(`${VENDOR}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		...props,
	});

	return response;
};

export const useUpdateStatusDone = (props) => {
	const response = useMutation({
		mutationKey: ['update-status-done'],
		mutationFn: async (data) => await Patch(`${UPDATE_DONE}`, data),
		...props,
	});

	return response;
};

export const useUpdateStatusInProgress = (props) => {
	const response = useMutation({
		mutationKey: ['update-status-in-progress'],
		mutationFn: async (data) => await Post(`${VENDOR}`, data),
		...props,
	});

	return response;
};
