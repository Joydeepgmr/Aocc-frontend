import { useGetAllPlannerAircraft, usePostPlannerAircraft } from './PlannerAirportMaster/PlannerAircraftAirportMaster';
import { useGetAllPlannerAirline, usePostPlannerAirline } from './PlannerAirportMaster/PlannerAirlineAirportMaster';
import {
	useGetAllTimelineData,
	useGetTimelineGroupData,
} from './ResourceAllocationServices/ResourceAllocationServices';

import { useDummyApi } from './dummyApi/dummyApi';

import {
	useGlobalAirport,
	useUploadCSVAircraftType,
	useGlobalCountries,
	useGetGlobalAirport,
	usePostGlobalAirport,
	usePatchGlobalAirport,
	useDeleteGlobalAirport,
	useGlobalAirportDropdown,
	useGetGlobalAirline,
	usePostGlobalAirline,
	usePatchGlobalAirline,
	useDeleteGlobalAirline,
	useGlobalAirlineDropdown,
	useGetGlobalAircraftType,
	usePostGlobalAircraftType,
	usePatchGlobalAircraftType,
	useDeleteGlobalAircraftType,
	useGlobalAircraftTypeDropdown,
	useGetGlobalAircraftRegistration,
	usePostGlobalAircraftRegistration,
	usePatchGlobalAircraftRegistration,
	useDeleteGlobalAircraftRegistration,
	useCountriesDropdown,
} from './globalMasters/globalMaster';

export {
	useDummyApi,
	useGetAllTimelineData,
	useGetTimelineGroupData,
	useGlobalAirport,
	useUploadCSVAircraftType,
	useGlobalCountries,
	useGetGlobalAirport,
	usePostGlobalAirport,
	usePatchGlobalAirport,
	useDeleteGlobalAirport,
	useGlobalAirportDropdown,
	useGetGlobalAirline,
	usePostGlobalAirline,
	usePatchGlobalAirline,
	useDeleteGlobalAirline,
	useGlobalAirlineDropdown,
	useGetGlobalAircraftType,
	usePostGlobalAircraftType,
	usePatchGlobalAircraftType,
	useDeleteGlobalAircraftType,
	useGlobalAircraftTypeDropdown,
	useGetGlobalAircraftRegistration,
	usePostGlobalAircraftRegistration,
	usePatchGlobalAircraftRegistration,
	useDeleteGlobalAircraftRegistration,
	useCountriesDropdown,
	useGetAllPlannerAircraft,
	useGetAllPlannerAirline,
	usePostPlannerAirline, 
	usePostPlannerAircraft,
};