import {
	useGetAllTimelineData,
	useGetTimelineGroupData,
} from './ResourceAllocationServices/ResourceAllocationServices';
import { useDummyApi } from './dummyApi/dummyApi';
import { useGetGlobalAirport,usePostGlobalAirport } from './globalMasters/globalMaster'

export { useDummyApi, useGetAllTimelineData, useGetTimelineGroupData, useGetGlobalAirport,usePostGlobalAirport };
