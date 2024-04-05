import { useMutation, useInfiniteQuery, useQuery } from 'react-query';
import { TERMINAL, GET_TERMINAL } from '../../../../api';
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetTerminal = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-terminal'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_TERMINAL}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) { return lastPage?.data?.paginated }
			return false;
		},
		...props,
	});

	return response;
};

export const usePostTerminal = (props) => {
	const response = useMutation({
		mutationKey: ['post-terminal'],
		mutationFn: async (data) => await Post(`${TERMINAL}`, data),
		...props,
	});

	return response;
};

export const useEditTerminal = (id, props) => {
	const response = useMutation({
		mutationKey: ['edit-terminal'],
		mutationFn: async (data) => await Patch(`${TERMINAL}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteTerminal = (props) => {
	const response = useMutation({
		mutationKey: ['delete-terminal'],
		mutationFn: async (id) => await Delete(`${TERMINAL}/${id}`),
		...props,
	});
	return response;
};

export const useTerminalDropdown = (props) => {
	const response = useQuery({
		queryKey: ['get-terminal-dropdown'],
		queryFn: async () => await Post(`${GET_TERMINAL}?bulk=true`),
		...props,
	})
	const data = response?.data?.data ?? []
	return { ...response, data }
}
