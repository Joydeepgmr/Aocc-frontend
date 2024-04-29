export const DUMMY = '/dummy';

/*------------------ Resource Allocation--------------------*/

export const GET_ALL_TIMELINE_DATA = '/resource-allocation/get-allocated-resources';
export const GET_TIMELINE_GROUP_DATA = '/resource-allocation/get-resources';
export const UPDATE_RESOURCE_ALLOCATION = '/resource-allocation/updateResource';

/*------------- login --------------*/
export const USER_LOGIN = '/user/login';

/*--------------Admin details -----------*/
export const GET_ADMIN_DETAILS = '/user/userinfo';

/*------------- IT admin airport Master --------------*/
export const POST_LICENSE = '/airport-license';
export const GET_LICENSE = '/airport-license/paginated/';
export const GET_AIRPORT_NAME = '/global-airport/paginated';

/*------------------ Seasonal Plans --------------------- */
export const GET_SEASONAL_PLANS = '/seasonalPlan/getPlans';
export const POST_SEASONAL_PLANS = '/seasonalPlan/createPlan';
export const EDIT_SEASONAL_PLANS_ARRIVAL = '/seasonalPlan/arrival';
export const EDIT_SEASONAL_PLANS_DEPARTURE = 'seasonalPlan/departure';
export const UPLOAD_CSV_BULK = '/seasonalPlan/bulkPlans';
export const DOWNLOAD_CSV_TEMPLATE = '/system-constant/';

/*------------- IT admin Global Master --------------*/
export const GET_GLOBAL_AIRPORT = '/global-airport/paginated';
export const POST_GLOBAL_AIRPORT = '/global-airport/';
export const PATCH_GLOBAL_AIRPORT = '/global-airport/';
export const DELETE_GLOBAL_AIRPORT = '/global-airport/';
export const POST_BULK_GLOBAL_AIRPORT = '/global-airport/upload/';

export const GET_GLOBAL_AIRCRAFT_TYPE = '/global-aircraft-type/paginated/';
export const POST_GLOBAL_AIRCRAFT_TYPE = '/global-aircraft-type/';
export const PATCH_GLOBAL_AIRCRAFT_TYPE = '/global-aircraft-type/';
export const DELETE_GLOBAL_AIRCRAFT_TYPE = '/global-aircraft-type/';
export const POST_BULK_GLOBAL_AIRCRAFT_TYPE = '/global-aircraft-type/upload/';

export const GET_GLOBAL_AIRCRAFT_REGISTRATION = '/global-aircraft-register/paginated/';
export const POST_GLOBAL_AIRCRAFT_REGISTRATION = '/global-aircraft-register/';
export const PATCH_GLOBAL_AIRCRAFT_REGISTRATION = '/global-aircraft-register/';
export const DELETE_GLOBAL_AIRCRAFT_REGISTRATION = '/global-aircraft-register/';
export const POST_BULK_GLOBAL_AIRCRAFT_REGISTRATION = '/global-aircraft-register/upload/';

export const GET_GLOBAL_AIRLINE = '/global-airline/paginated/';
export const POST_GLOBAL_AIRLINE = '/global-airline/';
export const PATCH_GLOBAL_AIRLINE = '/global-airline/';
export const DELETE_GLOBAL_AIRLINE = '/global-airline/';

export const GET_COUNTRY_DATA = '/country/';

/*--------------------------planner Dashboard ---------------------*/
export const GET_FLIGHT_SCHEDULE = '/flight-track/paginated';
export const GET_VIEW_MAP = '/flight-track';
export const GET_MILESTONE_DATA = '/milestone/paginated';
export const GET_TELEX_MESSAGE = '/telex/paginated';

/*--------------------------planner airport master ---------------------*/

export const GET_CHECKIN_COUNTER = '/checkin-counter/paginated';
export const CHECKIN_COUNTER = '/checkin-counter';
export const GET_GATE = '/gate/paginated';
export const GATE = '/gate';
export const GET_PARKING_STAND = '/parking-stand/paginated';
export const PARKING_STAND = '/parking-stand';
export const GET_TAXIWAY = '/taxiway/paginated';
export const TAXIWAY = '/taxiway';
export const GET_BAGGAGE_BELT = '/baggage-belt/paginated';
export const BAGGAGE_BELT = '/baggage-belt';
export const GET_RUNWAY = '/runway/paginated';
export const RUNWAY = '/runway';
export const GET_TERMINAL = '/terminal/paginated';
export const TERMINAL = '/terminal';
export const GET_DELAY_CODE = '/delay-code/paginated';
export const DELAY_CODE = '/delay-code';
export const GET_NATURE_CODE = '/nature-code/paginated';
export const NATURE_CODE = '/nature-code';

/*--------------------------planner aircraft master ---------------------*/

export const GET_PLANNER_AIRCRAFT = '/planner-aircraft/paginated';
export const POST_PLANNER_AIRCRAFT = '/planner-aircraft/';
export const DELETE_PLANNER_AIRCRAFT = '/planner-aircraft';
export const UPDATE_PLANNER_AIRCRAFT = '/planner-aircraft';

/*--------------------------planner airline master ---------------------*/

export const GET_PLANNER_AIRLINE = '/planner-airline/paginated';
export const POST_PLANNER_AIRLINE = '/planner-airline';
export const DELETE_PLANNER_AIRLINE = '/planner-airline';
export const UPDATE_PLANNER_AIRLINE = '/planner-airline';
export const BULK_IMPORT_PLANNER_AIRLINE = '/planner-airline/bulk';

/*--------------------------Manage Access ---------------------*/

export const POST_MANAGE_ACCESS = '/access-management';

/*--------------------------IT Admin Bulk import ---------------------*/

export const BULK_UPLOAD_GLOBAL_AIRPORT = '/global-airport/bulk';
export const BULK_UPLOAD_GLOBAL_AIRCRAFT_TYPE = '/global-aircraft-type/bulk/';
export const BULK_UPLOAD_GLOBAL_AIRLINE = '/global-airline/bulk';

/*-------------------------Security Approval -------------------------*/
export const GET_USER = '/bbs/paginated';
export const USER = '/bbs';

/*--------------------------Socket event name ---------------------*/
export const SOCKET_EVENT_NAME = 'UPDATE_API';

/*--------------------------CDM ---------------------*/
export const CDM_GET_ARRIVAL_DEPARTURE = '/cdmOps/';
export const UPDATE_CDM_DATA = '/cdmOps';
export const CDM_GET_TURN_AROUND = '/cdmOps/turnaround';
export const UPDATE_CDM_TURN_AROUND = '/cdmOps/turnaround';

/*-------------------------Vendor----------------------------------*/
export const VENDOR = '/vendor';
export const GET_VENDOR = '/vendor/paginated';

/*------------------------- Resource FIDS ----------------------------------*/
export const GET_FIDS_RESOURCES = '/screen/paginated';
export const POST_FIDS_RESOURCES = '/screen';
export const DELETE_FIDS_RESOURCES = '/screen';
export const UPDATE_FIDS_RESOURCES = '/screen';