import { useInfiniteQuery } from "react-query"
import { GET_MILESTONE_DATA } from "../../../api/endpoints";
import { Post } from "../../HttpServices/HttpServices";

export const useGetMileStoneData = ({ flightType, ...rest }) => {
    const response = useInfiniteQuery({
        queryKey: ['get-milestone-data', flightType],
        queryFn: async ({ pageParam: pagination = {} }) => await Post(`${GET_MILESTONE_DATA}?flightType=${flightType}`, { pagination }),
        getNextPageParam: (lastPage) => {
            if (lastPage?.pagination?.isMore) { return lastPage?.pagination }
            return false;
        },
        ...rest,
    });
    return { ...response }
}