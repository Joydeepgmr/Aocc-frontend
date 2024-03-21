import { useQuery, useMutation, useQueryClient } from 'react-query';
import { POST_LICENSE } from '../../api/endpoints';
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

