import { useQuery } from 'react-query';
import { DUMMY } from '../../api';
import { Get } from '../HttpServices/HttpServices';

export const useDummyApi = (props) => {
	const response = useQuery({
		queryKey: ['dummy'],
		queryFn: async () => await Get(`${DUMMY}`),
		...props,
	});

	const { data, error, isSuccess } = response;

	const statusMessage = isSuccess ? data?.message : error?.message;

	return {
		...response,
		data: data?.data,
		message: statusMessage,
	};
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
// };