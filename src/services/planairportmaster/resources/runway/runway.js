import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from 'react-query';
import { GET_RUNWAY, RUNWAY, UPLOAD_CSV_BULK_RUNWAY } from '../../../../api';
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';
import { DownloadFileByUrl, GenerateDownloadUrl } from '../../../../utils';

export const useGetRunway = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-runway'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_RUNWAY}`, { pagination }),
		getNextPageParam: (lastPage) => {
			if (lastPage?.pagination?.isMore) { return lastPage?.pagination }
			return false;
		},
		...props,
	});

	return response;
};

export const usePostRunway = (props) => {
	const response = useMutation({
		mutationKey: ['post-runway'],
		mutationFn: (data) => Post(`${RUNWAY}`, data),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.message
		: error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

	return { ...response, data, message: statusMessage };
};

export const useEditRunway = (id, props) => {
	const response = useMutation({
		mutationKey: ['edit-runway'],
		mutationFn: (data) => Patch(`${RUNWAY}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteRunway = (props) => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationKey: ['delete-runway'],
		mutationFn: (id) => Delete(`${RUNWAY}/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries('get-runway');
		},
		...props,
	});
	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess
		? data?.data?.message
		: error?.message;

	return { ...response, data: data?.data, message: statusMessage };
};


export const useRunwayDropdown = (props) => {
	const response = useQuery({
		queryKey: ['get-runway-dropdown'],
		queryFn: async () => await Post(`${GET_RUNWAY}?bulk=true`),
		...props,
	})
	const data = response?.data?.data ?? []
	return { ...response, data }
}

export const useUploadCSVRunway = (props) => {
	const response = useMutation({
		mutationKey: ['upload-csv-runway'],
		mutationFn: async (data) => {
			const resp = await Post(`${UPLOAD_CSV_BULK_RUNWAY}`, data);
			const downloadUrl = GenerateDownloadUrl(resp);
			DownloadFileByUrl(downloadUrl, 'Runway_uploaded');
			return resp;
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};