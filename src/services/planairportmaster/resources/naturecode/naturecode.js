import { useMutation, useInfiniteQuery } from 'react-query';
import { NATURE_CODE,GET_NATURE_CODE } from '../../../../api';
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetNatureCode = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-nature-code'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_NATURE_CODE}`,{pagination}),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) { return lastPage?.data?.paginated }
			return false;
		},
		...props,
	});

	return response;
};

export const usePostNatureCode = (props) => {
	const response = useMutation({
		mutationKey: ['post-nature-code'],
		mutationFn: async (data) => await Post(`${NATURE_CODE}`, data),
		...props,
	});

	return response;
};

export const useEditNatureCode = (id,props) => {
	const response = useMutation({
		mutationKey: ['edit-nature-code'],
		mutationFn: async (data) => await Patch(`${NATURE_CODE}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteNatureCode = (props) => {
	const response = useMutation({
		mutationKey: ['delete-nature-code'],
		mutationFn: async (id) => await Delete(`${NATURE_CODE}/${id}`),
		...props,
	});
	return response;
};
