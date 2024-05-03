import { useInfiniteQuery, useMutation } from 'react-query';
import { POST_MANAGE_ACCESS, GET_MANAGE_ACCESS, GET_MANAGE_ACCESS_PLANNER } from '../../api';
import { Post } from '../HttpServices/HttpServices';

export const useGetVendorAccess = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-user-vendor'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_MANAGE_ACCESS}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) {
				return lastPage?.data?.paginated;
			}
			return false;
		},
		...props,
		enabled: false,
	});

	return response;
};

export const useGetPlannerAccess = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-user-planner'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_MANAGE_ACCESS_PLANNER}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) {
				return lastPage?.data?.paginated;
			}
			return false;
		},
		...props,
		enabled: false,
	});
	return response;
};

export const usePostAccessManagement = (props) => {
	const response = useMutation({
		mutationKey: ['post-access-management'],
		mutationFn: async ({ type, values }) => {
			return await Post(`${POST_MANAGE_ACCESS}/${type}`, values);
		},
		...props,
	});
	return response;
};
