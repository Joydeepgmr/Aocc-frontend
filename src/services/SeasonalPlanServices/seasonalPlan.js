import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import {
	DOWNLOAD_CSV_TEMPLATE,
	EDIT_SEASONAL_PLANS_ARRIVAL,
	EDIT_SEASONAL_PLANS_DEPARTURE,
	GET_FLIGHT_SCHEDULE_PLANS,
	GET_SEASONAL_PLANS,
	POST_SEASONAL_PLANS,
	UPLOAD_CSV_BULK,
} from '../../api';
import { DownloadFileByUrl, GenerateDownloadUrl } from '../../utils';
import { Get, Patch, Post } from '../HttpServices/HttpServices';

export const useGetSeasonalPlans = (flightType, { search }, props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-seasonal-plans', search, flightType],
		queryFn: async ({ pageParam: pagination = {} }) =>
			await Post(`${GET_SEASONAL_PLANS}?flightType=${flightType}${search ? `&searchQuery=${search}` : ''}`, { pagination }),
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

export const useGetFlightSchedulePlans = (flightType, { search, date }, props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-flight-schedule', flightType, search, date],
		queryFn: async ({ pageParam: pagination = {} }) =>
			await Post(`${GET_FLIGHT_SCHEDULE_PLANS}&flightType=${flightType}${search ? `&searchQuery=${search}` : ''}${date ? `&from=${date[0]}&to=${date[1]}` : ''}`, { pagination }),
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

export const usePostSeasonalPlans = (props) => {
	const response = useMutation({
		mutationKey: ['post-seasonal-plans'],
		mutationFn: async (data) => await Post(`${POST_SEASONAL_PLANS}`, data),
		...props,
	});

	return response;
};

export const useEditSeasonalPlanArrival = (id, props) => {
	const response = useMutation({
		mutationKey: ['edit-seasonal-plan-arrival'],
		mutationFn: async (data) => await Patch(`${EDIT_SEASONAL_PLANS_ARRIVAL}/${id}`, data),
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useEditSeasonalPlanDeparture = (id, props) => {
	const response = useMutation({
		mutationKey: ['edit-seasonal-plan-departure'],
		mutationFn: async (data) => await Patch(`${EDIT_SEASONAL_PLANS_DEPARTURE}/${id}`, data),
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.data?.message : error?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useUploadCSV = (props) => {
	const response = useMutation({
		mutationKey: ['upload-csv'],
		mutationFn: async (data) => {
			const resp = await Post(`${UPLOAD_CSV_BULK}`, data);
			const downloadUrl = GenerateDownloadUrl(resp);
			DownloadFileByUrl(downloadUrl, 'Seasonal_uploaded');
			return resp;
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};

export const useDownloadCSV = (name, props) => {
	const response = useQuery({
		queryKey: ['get-download-csv', name],
		queryFn: async () => {
			const resp = await Get(`${DOWNLOAD_CSV_TEMPLATE}?name=${name}`);
			DownloadFileByUrl(resp?.url, name);
			return resp;
		},
		enabled: false,
		...props,
	});
	return { ...response };
};
