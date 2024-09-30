import { useMutation, useQuery } from "react-query"
import { Get, Post } from "../HttpServices/HttpServices"
import { GET_AIRLINE_SYNC_DATA, KPI_DASHBOARD, KPI_DETAILS, KPI_ON_TIME } from "../../api"

export const useGetDashboardData = ({ duration, ...props }) => {
    return useQuery({
        queryKey: ['get-kpi-dashboard'],
        queryFn: async () => await Post(`${KPI_DASHBOARD}`, { duration }),
        enabled: !!duration,
        ...props,
    });
}
export const useGetOnTimeData = ({ duration, ...props }) => {
    return useQuery({
        queryKey: ['get-kpi-on-time'],
        queryFn: async () => await Post(`${KPI_ON_TIME}`, { duration }),
        enabled: !!duration,
        ...props,
    });
}

export const useGetKpiDetails = ({ ...props }) => {
    const response = useMutation({
        mutationKey: ['get-kpi-details'],
        mutationFn: async (data) => await Post(KPI_DETAILS, data),
        ...props
    })
    const data = response?.data?.data?.result;
    return { ...response, data };
}