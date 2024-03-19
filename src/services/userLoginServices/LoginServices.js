import {useMutation} from 'react-query';
import { USER_LOGIN } from '../../api/endpoints';

import { Post } from '../HttpServices/HttpServices';
import { localStorageKey } from '../../keys';

export const useLoginUser = (props) => {
    const response = useMutation({
        mutationKey: ['user-login'],
        mutationFn: (data) => Post(USER_LOGIN, data),
        ...props,
    })

    const { data, error, isSuccess } = response;

    const statusMessage = isSuccess ? data?.message : error?.response?.data?.data?.message ?? error?.response?.data?.data?.error;

    return { ...response, data: data?.data?.payload, message:statusMessage}
}