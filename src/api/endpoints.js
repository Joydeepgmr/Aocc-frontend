export const DUMMY = '/dummy';

/*------------------ Resource Allocation--------------------*/

export const GET_ALL_TIMELINE_DATA = '/resource-allocation/get-allocated-resources';
export const GET_TIMELINE_GROUP_DATA = '/resource-allocation/get-resources';

/*------------- login --------------*/
export const USER_LOGIN = 'user/login';

/*------------- IT admin airport Master --------------*/
export const POST_LICENSE = 'airport-license';
export const GET_LICENSE = 'airport-license/';
export const GET_AIRPORT_NAME = 'airport/';

/*------------------ Seasonal Plans --------------------- */
export const GET_SEASONAL_PLANS = '/seasonalPlan/getPlans';
export const POST_SEASONAL_PLANS = '/seasonalPlan/createPlan';
export const EDIT_SEASONAL_PLANS_ARRIVAL = '/seasonalPlan/arrival';
export const EDIT_SEASONAL_PLANS_DEPARTURE = 'seasonalPlan/departure';
export const UPLOAD_CSV_BULK = '/seasonalPlan/bulkPlans';

/*------------- IT admin Global Master --------------*/
export const GET_GLOBAL_AIRPORT = '/global-airport/';
export const POST_GLOBAL_AIRPORT = '/global-airport/';
export const EDIT_GLOBAL_AIRPORT = '/global-airport/';
export const DELETE_GLOBAL_AIRPORT = '/airport/removeAirport';

/*--------------------------planner airport master ---------------------*/

export const POST_BAGGED_BELT = '';
export const GET_GLOBAL_AIRCRAFT_TYPE = '/global-aircraft-type/';
export const POST_GLOBAL_AIRCRAFT_TYPE = '/global-aircraft-type/';
export const POST_BULK_GLOBAL_AIRCRAFT_TYPE = '/global-aircraft-type/upload/';

export const GET_GLOBAL_AIRCRAFT_REGISTRATION = '/global-aircraft-register/';
export const POST_GLOBAL_AIRCRAFT_REGISTRATION = '/global-aircraft-register/';
export const POST_BULK_GLOBAL_AIRCRAFT_REGISTRATION = '/global-aircraft-register/upload/';

export const GET_GLOBAL_AIRLINE = '/global-airline/paginated';
export const POST_GLOBAL_AIRLINE = '/global-airline/';
export const PATCH_GLOBAL_AIRLINE = '/global-airline/';
export const DELETE_GLOBAL_AIRLINE = '/global-airline/';
