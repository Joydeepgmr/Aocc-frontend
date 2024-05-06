import { useInfiniteQuery, useMutation } from 'react-query';
import { EDIT_FLIGHT_SCHEDULE, GET_FLIGHT_SCHEDULE, GET_MILESTONE_DATA, GET_UTW, GET_VIEW_MAP } from '../../../api';
import { Get, Patch, Post } from '../../HttpServices/HttpServices';

export const useGetFlightScheduled = ({ tab, ...rest }) => {
	const response = useInfiniteQuery({
		queryKey: ['get-flight-schedule', tab],
		queryFn: async ({ pageParam: pagination = {} }) => {
			return await Post(`${GET_FLIGHT_SCHEDULE}?flightType=${tab}`, { pagination });
		},
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) {
				return lastPage?.pagination;
			}
			return false;
		},
		...rest,
	});
	return { ...response };
};

export const useEditFlightSchedule = (props) => {
	return useMutation({
		mutationKey: ['edit-flight-schedule'],
		mutationFn: async ({ id, data }) => {
			return await Patch(`${EDIT_FLIGHT_SCHEDULE}/${id}`, data);
		},
		...props,
	});
};


export const useGetFlightMileStone = (props) => {
	const response = useMutation({
		mutationKey: ['get-flight-milestone-data'],
		mutationFn: async ({ id, type }) => await Post(`${GET_MILESTONE_DATA}?flightType=${type}&flightId=${id}`),
		...props,
	});
	return { ...response };
};

export const useGetViewMap = (props) => {
	const response = useMutation({
		mutationKey: ['get-view-map'],
		mutationFn: async (id) => {
			return await Get(`${GET_VIEW_MAP}/${id}`);
		},
		...props,
	});
	return response;
};

export const useGetUtw = (props) => {
	const response = useMutation({
		mutationKey: ['get-utw'],
		mutationFn: async (id) => await Post(`${GET_UTW}?flightId=${id}`),
		...props,
	});
	return { ...response };
};
