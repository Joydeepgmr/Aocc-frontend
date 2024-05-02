import { useMutation, useQuery } from 'react-query';
import {
	DUMMY,
	GET_ALL_TIMELINE_DATA,
	GET_TIMELINE_GROUP_DATA,
	RUN_RULE_ENGINE,
	UPDATE_RESOURCE_ALLOCATION,
} from '../../api';
import { Get, Post } from '../HttpServices/HttpServices';

export const useGetAllTimelineData = (type, timeFormat, props) => {
	const response = useQuery({
		queryKey: ['get-all-timeline-data', type, timeFormat],
		queryFn: async () => await Get(`${GET_ALL_TIMELINE_DATA}?type=${type}&frame=${timeFormat}`),
		...props,
		enabled: !!type && !!timeFormat,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};

export const useGetTimelineGroupData = (type, timeFormat, props) => {
	const response = useQuery({
		queryKey: ['get-timeline-group-data', type, timeFormat],
		queryFn: async () => await Get(`${GET_TIMELINE_GROUP_DATA}?type=${type}&frame=${timeFormat}`),
		...props,
		enabled: !!type && !!timeFormat,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};

export const useUpdateResourceAllocation = (props) => {
	const response = useMutation({
		mutationKey: ['update-resource-allocation'],
		mutationFn: async (data) => await Post(`${UPDATE_RESOURCE_ALLOCATION}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : data?.error;

	return { ...response, data, message: statusMessage };
};

export const useRunRuleEngine = (props) => {
	const response = useQuery({
		queryKey: ['run-rule-engine'],
		queryFn: async () => await Get(`${RUN_RULE_ENGINE}`),
		...props,
		enabled: false,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.message;
	return {
		...response,
		data: data,
		message: statusMessage,
	};
};
