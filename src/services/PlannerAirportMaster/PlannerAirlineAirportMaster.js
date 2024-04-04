import { useInfiniteQuery, useMutation } from "react-query";
import { DELETE_PLANNER_AIRLINE, GET_PLANNER_AIRLINE, POST_PLANNER_AIRLINE } from "../../api";
import { Delete, Post } from "../HttpServices/HttpServices";

export const useGetAllPlannerAirline = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-all-planner-airline'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_PLANNER_AIRLINE}`, { pagination }),
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

export const usePostPlannerAirline = (props) => { 
	const response = useMutation({
		mutationKey: ['post-planner-airline'],
		mutationFn: async (data) => await Post(`${POST_PLANNER_AIRLINE}`, data),
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		:data?.error;

	return { ...response, data, message: statusMessage };
};

export const useDeletePlannerAirline = (props) => {
	const response = useMutation({
		mutationKey: ['delete-planner-airline'],
		mutationFn: async (id) => await Delete(`${DELETE_PLANNER_AIRLINE}/${id}`),
		...props,
	});
	return response;
};