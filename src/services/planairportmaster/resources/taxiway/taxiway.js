import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { TAXIWAY } from '../../../../api';
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetTaxiway = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-taxiway'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${TAXIWAY}`, {pagination}),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) { return lastPage?.pagination }
			return false;
		},
		...props,
	});

	// const { data, error, isSuccess } = response;

	// const statusMessage = isSuccess ? data?.message : error?.message;

	return response;
	// return {
	// 	...response,
	// 	data: data,
	// 	message: statusMessage,
	// };
};

// export const useGetCheckIn = (props) => {
//     const response = useInfiniteQuery({
//         queryKey: ['get-check-in'],
//         queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_CHECKIN_COUNTER}`,{pagination}),
//         getNextPageParam: (lastPage) => {
//             if (lastPage?.data?.paginated?.isMore) { return lastPage?.data?.paginated }
//             return false;
//         },
//         ...props,
//     });
 
//     return response;
// };

export const usePostTaxiway = (props) => {
	const response = useMutation({
		mutationKey: ['post-taxiway'],
		mutationFn: (data) => Post(`${TAXIWAY}`, data),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useEditTaxiway = (props) => {
	const response = useMutation({
		mutationKey: ['edit-taxiway'],
		mutationFn: (data) => Patch(`${TAXIWAY}`, data),
		...props,
	});

	return response;
};

export const useDeleteTaxiway = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['delete-taxiway'],
		mutationFn: (id) => Delete(`${TAXIWAY}/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries('get-taxiway');
		},
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.data?.message
		: error?.message;

	return { ...response, data: data?.data, message: statusMessage };
};
