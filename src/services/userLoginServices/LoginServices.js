import { useMutation, useQueries, useQuery } from 'react-query';
import { GET_ADMIN_DETAILS, GET_WEATHER_DETAILS, POST_RESET_PASSWORD, USER_LOGIN } from '../../api/endpoints';

import { Get, Post } from '../HttpServices/HttpServices';

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
    const response = useMutation({
        mutationKey: ['get-admin-detail'],
        mutationFn: () => Get(GET_ADMIN_DETAILS),
        ...props
    })
    return { ...response }
}
export const useGetWeatherDetails = (props) => {
    const response = useMutation({
        mutationKey: ['get-weather-detail'],
        mutationFn: () => Get(GET_WEATHER_DETAILS),
        ...props
    })
    return { ...response }
}

export const usePostResetPassword = (props) => {
    const response = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: (data) => Post(POST_RESET_PASSWORD, data),
        ...props
    })
    return { ...response }
}