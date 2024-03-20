import { useQuery, useQueryClient, useMutation } from 'react-query';
import { GET_GLOBAL_AIRPORT, POST_GLOBAL_AIRPORT } from "../../api/endpoints"
import { Get, Post } from '../HttpServices/HttpServices';

export const useGetGlobalAirport = (props) => {
	const response = useQuery({
		queryKey: ['global-airport'],
		queryFn: async () => await Get(`${GET_GLOBAL_AIRPORT}`),
		...props,
	});

	const { data, error, isSuccess } = response;

	console.log(response);

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data,
		message: statusMessage,
	};
};


export const usePostGlobalAirport = (props) => {
	const queryClient= useQueryClient()
	
	const response = useMutation({
		mutationKey: ['post-global-airport'],
		mutationFn: async (props) => await Post(`${POST_GLOBAL_AIRPORT}`, props),
		onSuccess: () => {
			queryClient.invalidateQueries('global-airport');
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};



// export const useDeleteUser = (id) => {
//     const response = useMutation({
//         mutationKey: ['delete-user', id],
//         mutationFn: () => Delete(`${DELETE_USER}/${id}`),
//     });
//     const { data, error, isSuccess } = response;

//     const statusMessage = isSuccess
//         ? data?.data?.message
//         : error?.response?.data?.message;

//     return { ...response, data: data?.payload?.data, message: statusMessage };