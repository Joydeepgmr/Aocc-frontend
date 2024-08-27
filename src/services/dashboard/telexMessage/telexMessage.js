import { useInfiniteQuery } from "react-query";
import { GET_TELEX_MESSAGE } from "../../../api/endpoints";
import { Post } from "../../HttpServices/HttpServices";

export const useGetTelexMessage = ({ filter, ...rest }) => {
    const response = useInfiniteQuery({
        queryKey: ['get-telex-message', { filter }],
        queryFn: async ({ pageParam: pagination = {}, queryKey }, payload1) => {
            const [_, payload] = queryKey;
            return await Post(`${GET_TELEX_MESSAGE}`, { pagination, ...payload });
        },
        getNextPageParam: (lastPage) => {
            if (lastPage?.pagination?.isMore) { return lastPage?.pagination }
            return false;
        },
        ...rest,
    });
    return { ...response }
}