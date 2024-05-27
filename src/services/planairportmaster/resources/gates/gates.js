import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { GATE, GATE_UPLOAD_CSV, GET_GATE } from "../../../../api";
import { Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetGate = (props) => {
	const response = useInfiniteQuery({
		queryKey: ['get-gate'],
		queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_GATE}`, { pagination }),
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

export const usePostGate = (props) => {
	const response = useMutation({
		mutationKey: ['post-gate'],
		mutationFn: async (data) => await Post(`${GATE}`, data),
		...props,
	});

	return response;
};

export const useEditGate = (id, props) => {
	const response = useMutation({
		mutationKey: ['edit-gate'],
		mutationFn: async (data) => await Patch(`${GATE}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteGate = (props) => {
	const response = useMutation({
		mutationKey: ['delete-gate'],
		mutationFn: async (id) => await Delete(`${GATE}/${id}`),
		...props,
	});

	return response;
};

export const useGateDropdown = (props) => {
	const response = useQuery({
		queryKey: ['get-gate-dropdown'],
		queryFn: async () => await Post(`${GET_GATE}?bulk=true`),
		...props,
	})
	const data = response?.data?.data ?? []
	return { ...response, data }
}

export const useUploadCSVGates = (props) => {
	const response = useMutation({
		queryKey: ['gate-upload-csv'],
		mutationFn: async (data) => {
			const resp = await Post(`${GATE_UPLOAD_CSV}`, data);
			const downloadUrl = GenerateDownloadUrl(resp);
			DownloadFileByUrl(downloadUrl, 'Gate_uploaded');
			return resp;
		},
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.response?.data?.message;

	return { ...response, data: data?.data, message: statusMessage };
};
