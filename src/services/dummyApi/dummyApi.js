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
