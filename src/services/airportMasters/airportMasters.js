import { useQuery, useMutation, useQueryClient } from 'react-query';
import { POST_LICENSE, GET_LICENSE, GET_AIRPORT_NAME } from '../../api/endpoints';
import { Get, Post } from '../HttpServices/HttpServices';

export const usePostLicenseAirport = (props) => {
	const queryClient = useQueryClient();

	const response = useMutation({
		mutationKey: ['add-license'],
		mutationFn: async (props) => await Post(`${POST_LICENSE}`, props),
		onSuccess: () => {
			queryClient.invalidateQueries('airport-license');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useGetLicenseData = (props) => {
	const response = useQuery({
		queryKey: ['license'],
		queryFn: async () => await Get(`${GET_LICENSE}`),
		...props,
	})

	const { data, error, isSuccess} = response;

	console.log(response?.data);
	
	const statusMessage = isSuccess ? data?.message : error?.message;  

	return {
		...response, 
		data: data,
		message: statusMessage,
	}
}

export const useGetAirportName = (props) => {
	const response = useQuery({
		queryKey: ["airport-data"],
		queryFn: async () => await Get(`${GET_AIRPORT_NAME}`),
		...props,
	})

	const { data, error, isSuccess} =  response;

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	}
}

