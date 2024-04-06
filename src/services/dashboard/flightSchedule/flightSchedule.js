import { useInfiniteQuery } from "react-query";
import { GET_FLIGHT_SCHEDULE } from "../../../api/endpoints";
import { Post } from "../../HttpServices/HttpServices";

export const useGetFlightScheduled = ({ tab, ...rest }) => {
    const response = useInfiniteQuery({
        queryKey: ['get-flight-schedule', tab],
        queryFn: async ({ pageParam: pagination = {} }) => {
            return await Post(`${GET_FLIGHT_SCHEDULE}?flightType=${tab}`, { pagination });
        },
        getNextPageParam: (lastPage) => {
            if (lastPage?.pagination?.isMore) { return lastPage?.pagination }
            return false;
        },
        ...rest,
    });
    return { ...response }
}