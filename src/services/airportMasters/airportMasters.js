import { useInfiniteQuery, useMutation } from 'react-query';
import { GET_LICENSE, POST_LICENSE } from '../../api/endpoints';
import { Post } from '../HttpServices/HttpServices';

export const useGetLicenseData = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['license'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_LICENSE}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) { return lastPage?.pagination }
			return false;
		},
		...props,
	});
	return { ...response };
};

export const usePostLicenseAirport = (props) => {
	const response = useMutation({
		mutationKey: ['add-license'],
		mutationFn: async (props) => await Post(`${POST_LICENSE}`, props),
		...props,
	});
	return { ...response };
};