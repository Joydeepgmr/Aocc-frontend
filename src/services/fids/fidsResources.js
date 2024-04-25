import { useQuery } from 'react-query';
import { GET_BAGGAGE_BELT, GET_CHECKIN_COUNTER, GET_TERMINAL } from '../../api';
import { Post } from '../HttpServices/HttpServices';

export const useCheckInDropdown = (props) => {
	const response = useQuery({
		queryKey: ['check-in-dropdown'],
		queryFn: async () => await Post(`${GET_CHECKIN_COUNTER}?bulk=true`),
		...props,
		enabled: false,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};

export const useTerminalDropdown = (props) => {
	const response = useQuery({
		queryKey: ['terminal-dropdown'],
		queryFn: async () => await Post(`${GET_TERMINAL}?bulk=true`),
		...props,
		enabled: false,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};

export const useBaggageBeltDropdown = (props) => {
	const response = useQuery({
		queryKey: ['baggage-belt-dropdown'],
		queryFn: async () => await Post(`${GET_BAGGAGE_BELT}?bulk=true`),
		...props,
		enabled: false,
	});
	const data = response?.data?.data ?? [];
	return { ...response, data };
};
