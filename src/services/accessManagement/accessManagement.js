import { useInfiniteQuery, useMutation } from 'react-query';
import { POST_MANAGE_ACCESS, GET_MANAGE_ACCESS, GET_MANAGE_ACCESS_PLANNER, GET_MANAGE_ACCESS_SECURITY, GET_MANAGE_ACCESS_FIDS } from '../../api';
import { Get, Post } from '../HttpServices/HttpServices';

export const useGetFidsAccess = ({ tab, ...props }) => {
	const response = useInfiniteQuery({
		queryKey: ['get-user-fids', tab],
		queryFn: async ({ pageParam: pagination = {} }) => await Get(`${GET_MANAGE_ACCESS_FIDS}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		...props,
		enabled: false,
	});

	return response;
};

export const useGetSecurityAccess = ({ tab, ...props }) => {
	const response = useInfiniteQuery({
		queryKey: ['get-user-security', tab],
		queryFn: async ({ pageParam: pagination = {} }) => await Get(`${GET_MANAGE_ACCESS_SECURITY}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		...props,
		enabled: false,
	});

	return response;
};
export const useGetVendorAccess = ({ tab, ...props }) => {
	const response = useInfiniteQuery({
		queryKey: ['get-user-vendor', tab],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_MANAGE_ACCESS}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		...props,
		enabled: false,
	});

	return response;
};

export const useGetPlannerAccess = ({ tab, ...props }) => {
	const response = useInfiniteQuery({
		queryKey: ['get-user-planner', tab],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_MANAGE_ACCESS_PLANNER}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
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
