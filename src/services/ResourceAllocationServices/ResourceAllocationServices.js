import { useQuery } from 'react-query';
import { DUMMY, GET_ALL_TIMELINE_DATA, GET_TIMELINE_GROUP_DATA } from '../../api';
import { Get } from '../HttpServices/HttpServices';

export const useGetAllTimelineData = (type, props) => {
	const response = useQuery({
		queryKey: ['get-all-timeline-data', type],
		queryFn: async () => await Get(`${GET_ALL_TIMELINE_DATA}?resourceAllocationType=${type}`),
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

export const useGetTimelineGroupData = (type, props) => {
	const response = useQuery({
		queryKey: ['get-timeline-group-data', type],
		queryFn: async () => await Get(`${GET_TIMELINE_GROUP_DATA}?resourceAllocationType=${type}`),
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
