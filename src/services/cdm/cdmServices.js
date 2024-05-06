import { useInfiniteQuery, useMutation } from 'react-query';
import { CDM_GET_ARRIVAL_DEPARTURE, CDM_GET_TURN_AROUND, UPDATE_CDM_DATA, UPDATE_CDM_TURN_AROUND } from '../../api';
import { Patch, Post } from '../HttpServices/HttpServices';

export const useGetAllCdmArrivalDeparture = (type, format, props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-all-cdm-arrival-departure', type, format],
		queryFn: async ({ pageParam: pagination = {} }) =>
			await Post(`${CDM_GET_ARRIVAL_DEPARTURE}?frame=${format}&type=${type}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		enabled: !!type,
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};

export const useUpdateCdmTypes = (props) => {
	const response = useMutation({
		mutationKey: ['update-cdm-types'],
		mutationFn: async ({ id, data }) => await Patch(`${UPDATE_CDM_DATA}/${id}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : data?.error;

	return { ...response, data, message: statusMessage };
};

export const useGetAllCdmTurnAround = (format, props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-all-cdm-turn-around', format],
		queryFn: async ({ pageParam: pagination = {} }) =>
			await Post(`${CDM_GET_TURN_AROUND}?frame=${format}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		enabled: false,
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};

export const useUpdateCdmTurnAround = (props) => {
	const response = useMutation({
		mutationKey: ['update-cdm-turn-around'],
		mutationFn: async ({ arrivalId, departureId, data }) =>
			await Patch(`${UPDATE_CDM_TURN_AROUND}?arrivalId=${arrivalId}&departureId=${departureId}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : data?.error;

	return { ...response, data, message: statusMessage };
};
