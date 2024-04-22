import { useMutation, useInfiniteQuery } from 'react-query';
import { VENDOR,GET_VENDOR } from '../../api';
import { Post, Patch } from '../HttpServices/HttpServices';

export const useGetVendor = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-vendor'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_VENDOR}`,{pagination}),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) { return lastPage?.data?.paginated }
			return false;
		},
		...props,
	});

	return response;
};

export const useUpdateStatus = (id,props) => {
	const response = useMutation({
		mutationKey: ['update-status'],
		mutationFn: async (data) => await Patch(`${VENDOR}/${id}`, data),
		...props,
	});

	return response;
};
