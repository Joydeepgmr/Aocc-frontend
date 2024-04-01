import { useMutation, useQueries, useQuery } from 'react-query';
import { GET_ADMIN_DETAILS, USER_LOGIN } from '../../api/endpoints';

import { Post } from '../HttpServices/HttpServices';

export const useLoginUser = (props) => {
    const response = useMutation({
        mutationKey: ['user-login'],
        mutationFn: (data) => Post(USER_LOGIN, data),
        ...props,
    })

    const { data, error, isSuccess } = response;

    const statusMessage = isSuccess ? data?.message : error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

    return { ...response, data: data?.data?.payload, message: statusMessage }
}

export const useGetUserDetails = (props) => {
    const response = useQuery({
        queryKey: ['get-admin-detail'],
        queryFn: () => Get(GET_ADMIN_DETAILS),
        ...props
    })
    return { ...response }
}