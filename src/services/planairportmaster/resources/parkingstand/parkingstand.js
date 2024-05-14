import { useMutation, useInfiniteQuery, useQuery } from 'react-query';
import { PARKING_STAND,GET_PARKING_STAND } from '../../../../api';
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetParkingStand = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-parking-stand'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_PARKING_STAND}`,{pagination}),
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
	const response = useMutation({
		mutationKey: ['delete-parking-stand'],
		mutationFn: async (id) => await Delete(`${PARKING_STAND}/${id}`),
		...props,
	});
	return response;
};

export const useStandDropdown = (props) => {
	const response = useQuery({
		queryKey: ['get-stand-dropdown'],
		queryFn: async () => await Post(`${GET_PARKING_STAND}?bulk=true`),
		...props,
	})
	const data = response?.data?.data ?? []
	return { ...response, data }
}
