const FRMS = "frms/api/v1"
const BBS = "bbs/api/v1"

export const DUMMY = '/dummy';

/*------------------ Resource Allocation--------------------*/

export const GET_ALL_TIMELINE_DATA = FRMS + '/resource-allocation/get-allocated-resources';
export const GET_TIMELINE_GROUP_DATA = FRMS + '/resource-allocation/get-resources';
export const UPDATE_RESOURCE_ALLOCATION =FRMS +  '/resource-allocation/updateResource';

/*------------- login --------------*/
export const USER_LOGIN = FRMS + '/user/login';

/*--------------Admin details -----------*/
export const GET_ADMIN_DETAILS = FRMS + '/user/userinfo';

/*------------- IT admin airport Master --------------*/
export const POST_LICENSE = FRMS + '/airport-license';
export const GET_LICENSE = FRMS + '/airport-license/paginated/';
export const GET_AIRPORT_NAME =FRMS + '/global-airport/paginated';

/*------------------ Seasonal Plans --------------------- */
export const GET_SEASONAL_PLANS =FRMS +  '/seasonalPlan/getPlans';
export const POST_SEASONAL_PLANS = FRMS + '/seasonalPlan/createPlan';
export const EDIT_SEASONAL_PLANS_ARRIVAL = FRMS +  '/seasonalPlan/arrival';
export const EDIT_SEASONAL_PLANS_DEPARTURE = FRMS +  'seasonalPlan/departure';
export const UPLOAD_CSV_BULK =FRMS +  '/seasonalPlan/bulkPlans';
export const DOWNLOAD_CSV_TEMPLATE = FRMS +  '/system-constant/';

/*------------- IT admin Global Master --------------*/
export const GET_GLOBAL_AIRPORT =FRMS +  '/global-airport/paginated';
export const POST_GLOBAL_AIRPORT = FRMS + '/global-airport/';
export const PATCH_GLOBAL_AIRPORT = FRMS + '/global-airport/';
export const DELETE_GLOBAL_AIRPORT = FRMS + '/global-airport/';
export const POST_BULK_GLOBAL_AIRPORT = FRMS + '/global-airport/upload/';

export const GET_GLOBAL_AIRCRAFT_TYPE = FRMS + '/global-aircraft-type/paginated/';
export const POST_GLOBAL_AIRCRAFT_TYPE =FRMS +  '/global-aircraft-type/';
export const PATCH_GLOBAL_AIRCRAFT_TYPE =FRMS +  '/global-aircraft-type/';
export const DELETE_GLOBAL_AIRCRAFT_TYPE =FRMS +  '/global-aircraft-type/';
export const POST_BULK_GLOBAL_AIRCRAFT_TYPE =FRMS +  '/global-aircraft-type/upload/';

export const GET_GLOBAL_AIRCRAFT_REGISTRATION =FRMS +  '/global-aircraft-register/paginated/';
export const POST_GLOBAL_AIRCRAFT_REGISTRATION =FRMS +  '/global-aircraft-register/';
export const PATCH_GLOBAL_AIRCRAFT_REGISTRATION =FRMS +  '/global-aircraft-register/';
export const DELETE_GLOBAL_AIRCRAFT_REGISTRATION =FRMS +  '/global-aircraft-register/';
export const POST_BULK_GLOBAL_AIRCRAFT_REGISTRATION =FRMS +  '/global-aircraft-register/upload/';

export const GET_GLOBAL_AIRLINE = FRMS + '/global-airline/paginated/';
export const POST_GLOBAL_AIRLINE = FRMS + '/global-airline/';
export const PATCH_GLOBAL_AIRLINE = FRMS + '/global-airline/';
export const DELETE_GLOBAL_AIRLINE = FRMS + '/global-airline/';

export const GET_COUNTRY_DATA = FRMS + '/country/';

/*--------------------------planner Dashboard ---------------------*/
export const GET_FLIGHT_SCHEDULE = FRMS + '/flight-track/paginated';
export const GET_VIEW_MAP = FRMS + '/flight-track';
export const GET_MILESTONE_DATA =FRMS +  '/milestone/paginated';
export const GET_TELEX_MESSAGE = FRMS + '/telex/paginated';

/*--------------------------planner airport master ---------------------*/

export const GET_CHECKIN_COUNTER =FRMS +  '/checkin-counter/paginated';
export const CHECKIN_COUNTER =FRMS +  '/checkin-counter';
export const GET_GATE =FRMS +  '/gate/paginated';
export const GATE =FRMS + '/gate';
export const GET_PARKING_STAND = FRMS + '/parking-stand/paginated';
export const PARKING_STAND = FRMS + '/parking-stand';
export const GET_TAXIWAY = FRMS + '/taxiway/paginated';
export const TAXIWAY = FRMS + '/taxiway';
export const GET_BAGGAGE_BELT = FRMS + '/baggage-belt/paginated';
export const BAGGAGE_BELT = FRMS + '/baggage-belt';
export const GET_RUNWAY = FRMS + '/runway/paginated';
export const RUNWAY = FRMS + '/runway';
export const GET_TERMINAL = FRMS + '/terminal/paginated';
export const TERMINAL = FRMS + '/terminal';
export const GET_DELAY_CODE = FRMS + '/delay-code/paginated';
export const DELAY_CODE = FRMS + '/delay-code';
export const GET_NATURE_CODE = FRMS + '/nature-code/paginated';
export const NATURE_CODE = FRMS + '/nature-code';

/*--------------------------planner aircraft master ---------------------*/

export const GET_PLANNER_AIRCRAFT = FRMS + '/planner-aircraft/paginated';
export const POST_PLANNER_AIRCRAFT = FRMS + '/planner-aircraft/';
export const DELETE_PLANNER_AIRCRAFT = FRMS + '/planner-aircraft';
export const UPDATE_PLANNER_AIRCRAFT = FRMS + '/planner-aircraft';

/*--------------------------planner airline master ---------------------*/

export const GET_PLANNER_AIRLINE = FRMS + '/planner-airline/paginated';
export const POST_PLANNER_AIRLINE = FRMS + '/planner-airline';
export const DELETE_PLANNER_AIRLINE = FRMS + '/planner-airline';
export const UPDATE_PLANNER_AIRLINE = FRMS + '/planner-airline';
export const BULK_IMPORT_PLANNER_AIRLINE = FRMS + '/planner-airline/bulk';

/*--------------------------Manage Access ---------------------*/

export const POST_MANAGE_ACCESS = FRMS + '/access-management';

/*--------------------------IT Admin Bulk import ---------------------*/

export const BULK_UPLOAD_GLOBAL_AIRPORT = FRMS + '/global-airport/bulk';
export const BULK_UPLOAD_GLOBAL_AIRCRAFT_TYPE = FRMS + '/global-aircraft-type/bulk/';
export const BULK_UPLOAD_GLOBAL_AIRLINE = FRMS + '/global-airline/bulk';

/*-------------------------Security Approval -------------------------*/
export const GET_USER = BBS + '/users/paginated';
export const USER = BBS + '/users';