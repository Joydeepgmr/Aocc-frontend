import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GET_SEASONAL_PLANS, POST_SEASONAL_PLANS, EDIT_SEASONAL_PLANS_ARRIVAL, EDIT_SEASONAL_PLANS_DEPARTURE, UPLOAD_CSV_BULK } from '../../api';
import { Get, Post,Patch } from '../HttpServices/HttpServices';

export const useGetSeasonalPlans = (flightType,tab,props) => {
	const response = useQuery({
		queryKey: ['get-seasonal-plans', flightType,tab],
		queryFn: async () => await Get(`${GET_SEASONAL_PLANS}?flightType=${flightType}&tab=${tab}`),
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

export const usePostSeasonalPlans = (props) => {
    const queryClient = useQueryClient()
	const response = useMutation({
		mutationKey: ['post-seasonal-plans'],
		mutationFn: async (data) => await Post(`${POST_SEASONAL_PLANS}`, data),
        onSuccess: () => {
			queryClient.invalidateQueries('get-seasonal-plans');
		},
		...props,
	});

	const { data, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		:data?.error;

	return { ...response, data, message: statusMessage };
};

export const useEditSeasonalPlanArrival = (id,props) => {
	const response = useMutation({
		mutationKey: ['edit-seasonal-plan-arrival'],
		mutationFn: (data) => Patch(`${EDIT_SEASONAL_PLANS_ARRIVAL}/${id}`, data),
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.message;

	return { ...response, data: data?.data , message : statusMessage};
};

export const useEditSeasonalPlanDeparture = (id,props) => {
	const response = useMutation({
		mutationKey: ['edit-seasonal-plan-departure'],
		mutationFn: (data) => Patch(`${EDIT_SEASONAL_PLANS_DEPARTURE}/${id}`, data),
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.data?.message
		: error?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useUploadCSV = (props) => {
	const response = useMutation({
		mutationKey: ['upload-csv'],
		mutationFn: (data) => Post(`${UPLOAD_CSV_BULK}`, data),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};