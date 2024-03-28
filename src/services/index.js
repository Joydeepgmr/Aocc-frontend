import {
	useGetAllTimelineData,
	useGetTimelineGroupData,
} from './ResourceAllocationServices/ResourceAllocationServices';

import { useDummyApi } from './dummyApi/dummyApi';

import {
	useGetGlobalAirport,
	usePostGlobalAirport,
	usePatchGlobalAirport,
	useGlobalAircraftType,
	useUploadCSVAircraftType,
	useGlobalAircraftRegistration,
	useGlobalAirline,
} from './globalMasters/globalMaster';

export {
	useDummyApi,
	useGetAllTimelineData,
	useGetTimelineGroupData,
	useGetGlobalAirport,
	usePostGlobalAirport,
	usePatchGlobalAirport,
	useGlobalAircraftType,
	useUploadCSVAircraftType,
	useGlobalAircraftRegistration,
	useGlobalAirline,
};
