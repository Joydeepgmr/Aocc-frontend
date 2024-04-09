import { useInfiniteQuery, useMutation } from "react-query";
import { GET_FLIGHT_SCHEDULE, GET_VIEW_MAP } from "../../../api/endpoints";
import { Get, Post } from "../../HttpServices/HttpServices";

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
export const useGetViewMap = (props) => {
    const response = useMutation({
        mutationKey: ['get-view-map'],
        mutationFn: async (id) => {
            return await Get(`${GET_VIEW_MAP}/${id}`)
        },
        ...props,
    })
    return response;
}