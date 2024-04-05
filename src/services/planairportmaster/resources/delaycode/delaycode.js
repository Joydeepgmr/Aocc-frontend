import { useMutation, useInfiniteQuery } from 'react-query';
import { DELAY_CODE,GET_DELAY_CODE } from '../../../../api';
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetDelayCode = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-delay-code'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_DELAY_CODE}`,{pagination}),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) { return lastPage?.data?.paginated }
			return false;
		},
		...props,
	});

	return response;
};

export const usePostDelayCode = (props) => {
	const response = useMutation({
		mutationKey: ['post-delay-code'],
		mutationFn: async (data) => await Post(`${DELAY_CODE}`, data),
		...props,
	});

	return response;
};

export const useEditDelayCode = (id,props) => {
	const response = useMutation({
		mutationKey: ['edit-delay-code'],
		mutationFn: async (data) => await Patch(`${DELAY_CODE}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteDelayCode = (props) => {
	const response = useMutation({
		mutationKey: ['delete-delay-code'],
		mutationFn: async (id) => await Delete(`${DELAY_CODE}/${id}`),
		...props,
	});
	return response;
};
