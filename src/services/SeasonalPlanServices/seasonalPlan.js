import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import {
	DOWNLOAD_CSV_TEMPLATE,
	EDIT_SEASONAL_PLANS_ARRIVAL,
	EDIT_SEASONAL_PLANS_DEPARTURE,
	GET_SEASONAL_PLANS,
	POST_SEASONAL_PLANS,
	UPLOAD_CSV_BULK,
} from '../../api';
import { DownloadFileByUrl, GenerateDownloadUrl } from '../../utils';
import { Get, Patch, Post } from '../HttpServices/HttpServices';

export const useGetSeasonalPlans = (flightType, tab, props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-seasonal-plans', flightType, tab],
		queryFn: async ({ pageParam: pagination = {} }) =>
			await Post(`${GET_SEASONAL_PLANS}?flightType=${flightType}&tab=${tab}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) {
				return lastPage?.data?.paginated;
			}
			return false;
		},
		...props,
	});

	return response;
};

export const useGetFlightSchedulePlans = (flightType, tab, { search, date }, props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-flight-schedule', flightType, tab, search, date],
		queryFn: async ({ pageParam: pagination = {} }) =>
			await Post(`${GET_SEASONAL_PLANS}?flightType=${flightType}&tab=${tab}${search ? `&searchQuery=${search}` : ''}${date ? `&from=${date[0]}&to=${date[1]}` : ''}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.data?.paginated?.isMore) {
				return lastPage?.data?.paginated;
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
			DownloadFileByUrl(downloadUrl);
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
			DownloadFileByUrl(resp?.url);
			return resp;
		},
		enabled: false,
		...props,
	});
	return { ...response };
};
