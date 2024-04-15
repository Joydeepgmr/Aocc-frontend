import { useInfiniteQuery, useMutation } from 'react-query';
import { GET_USER, USER } from '../../api';
import { Post, Patch } from '../HttpServices/HttpServices';

export const useGetUser = (tab,props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-user',tab],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_USER}?tab=${tab}`,{pagination}),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) { return lastPage?.data?.paginated }
			return false;
		},
		...props,
	});

	return response;
};

export const useStatusUser = (id,props) => {
	const response = useMutation({
		mutationKey: ['post-status'],
		mutationFn: async (data) => await Patch(`${USER}/?id=${id}`,data),
		...props,
	});

	return response;
};
