import { useMutation, useInfiniteQuery, useQueryClient } from 'react-query';
import { PARKING_STAND,GET_PARKING_STAND } from '../../../../api';
import { Get, Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetParkingStand = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-parking-stand'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_PARKING_STAND}`,{pagination}),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) { return lastPage?.data?.paginated }
			return false;
		},
		...props,
	});

	return response;
};

export const usePostParkingStand = (props) => {
	const response = useMutation({
		mutationKey: ['post-parking-stand'],
		mutationFn: async (data) => await Post(`${PARKING_STAND}`, data),
		...props,
	});

	return response;
};

export const useEditParkingStand = (id,props) => {
	const response = useMutation({
		mutationKey: ['edit-parking-stand'],
		mutationFn: async (data) => await Patch(`${PARKING_STAND}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteParkingStand = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['delete-parking-stand'],
		mutationFn: async (id) => await Delete(`${PARKING_STAND}/${id}`),
		...props,
	});
	return response;
};
