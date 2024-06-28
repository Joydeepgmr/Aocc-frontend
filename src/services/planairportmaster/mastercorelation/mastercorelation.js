import { useMutation, useQuery } from 'react-query';
import { AIRLINE_CORELATION, RESOURCE_CORELATION, UPDATE_RESOURCE_CORELATION } from '../../../api';
import { Get, Patch } from '../../HttpServices/HttpServices';

export const useGetResourceCorelation = ({ type, ...props }) => {
	return useQuery({
		queryKey: ['get-resource-corelation-data', type],
		queryFn: async () => await Get(`${RESOURCE_CORELATION}?type=${type}`),
		...props
	})
}

export const useUpdateResourceCorelation = (props) => {
	return useMutation({
		mutationKey: 'update-resource-weight',
		mutationFn: async ({ id, data }) => await Patch(`${UPDATE_RESOURCE_CORELATION}/${id}`, data),
		...props
	})
}

export const useGetAirlinesCorelation = (props) => {
	return useQuery({
		queryKey: ['get-all-planner-airline'],
		queryFn: async () => await Get(AIRLINE_CORELATION),
		...props,
	});
};

export const useUpdateAirlineCorelation = (props) => {
	return useMutation({
		mutationKey: 'update-airline-weight',
		mutationFn: async ({ id, data }) => await Patch(`${AIRLINE_CORELATION}/${id}`, data),
		...props
	})
}