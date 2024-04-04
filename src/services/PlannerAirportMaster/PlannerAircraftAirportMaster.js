import { useInfiniteQuery, useMutation } from "react-query";
import { GET_PLANNER_AIRCRAFT, POST_PLANNER_AIRCRAFT } from "../../api";
import { Post } from "../HttpServices/HttpServices";

export const useGetAllPlannerAircraft = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-all-planner-aircraft'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_PLANNER_AIRCRAFT}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) { return lastPage?.pagination }
			return false;
		},
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

export const usePostPlannerAircraft = (props) => { 
	const response = useMutation({
		mutationKey: ['post-planner-aircraft'],
		mutationFn: async (data) => await Post(`${POST_PLANNER_AIRCRAFT}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		:data?.error;

	return { ...response, data, message: statusMessage };
};