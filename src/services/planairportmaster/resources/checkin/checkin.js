import { useMutation, useInfiniteQuery, useQuery } from 'react-query';
import { CHECKIN_COUNTER, GET_CHECKIN_COUNTER, UPLOAD_CSV_BULK_CHECKIN } from '../../../../api';
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetCheckIn = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-check-in'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_CHECKIN_COUNTER}`, { pagination }),
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

export const usePostCheckIn = (props) => {
	const response = useMutation({
		mutationKey: ['post-check-in'],
		mutationFn: async (data) => await Post(`${CHECKIN_COUNTER}`, data),
		...props,
	});

	return response;
};

export const useEditCheckin = (id, props) => {
	const response = useMutation({
		mutationKey: ['edit-checkin'],
		mutationFn: async (data) => await Patch(`${CHECKIN_COUNTER}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteCheckin = (props) => {
	const response = useMutation({
		mutationKey: ['delete-checkin'],
		mutationFn: async (id) => await Delete(`${CHECKIN_COUNTER}/${id}`),
		...props,
	});
	return response;
};

export const useCheckInDropdown = (props) => {
	const response = useQuery({
		queryKey: ['get-check-in-dropdown'],
		queryFn: async () => await Post(`${GET_CHECKIN_COUNTER}?bulk=true`),
		...props,
	})
	const data = response?.data?.data ?? []
	return { ...response, data }
}

export const useUploadCSVCheckIn = (props) => {
	const response = useMutation({
		mutationKey: ['upload-csv-check-in'],
		mutationFn: async (data) => {
			const resp = await Post(`${UPLOAD_CSV_BULK_CHECKIN}`, data);
			// const downloadUrl = GenerateDownloadUrl(resp);
			// DownloadFileByUrl(downloadUrl);
			return resp;
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};