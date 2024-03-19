import { useQuery } from 'react-query';
import {GLOBAL_AIRPORT} from "../../api/endpoints"
import { Get } from '../HttpServices/HttpServices';

export const useGetGlobalAirport = (props) => {
	const response = useQuery({
		queryKey: ['get-global-airport'],
		queryFn: async () => await Get(`${GLOBAL_AIRPORT}`),
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