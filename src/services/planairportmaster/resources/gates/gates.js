import { useQuery, useMutation } from 'react-query';
import { GATE } from "../../../../api";
import { Get, Post, Patch, Delete } from '../../../HttpServices/HttpServices';

export const useGetGate = (props) => {
	const response = useQuery({
		queryKey: ['get-gate'],
		queryFn: async () => await Get(`${GATE}`),
		...props,
	});

	return response;
};

export const usePostGate = (props) => {
	const response = useMutation({
		mutationKey: ['post-gate'],
		mutationFn: (data) => Post(`${GATE}`, data),
		...props,
	});

	return response;
};

export const useEditGate = (id,props) => {
	const response = useMutation({
		mutationKey: ['edit-gate'],
		mutationFn: (data) => Patch(`${GATE}/${id}`, data),
		...props,
	});

	return response;
};

export const useDeleteGate = (props) => {
	const response = useMutation({
		mutationKey: ['delete-gate'],
		mutationFn: (id) => Delete(`${GATE}/${id}`),
		...props,
	});

	return response;
};
