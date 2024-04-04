export const DUMMY = '/dummy';

/*------------------ Resource Allocation--------------------*/

export const GET_ALL_TIMELINE_DATA = '/resource-allocation/get-allocated-resources';
export const GET_TIMELINE_GROUP_DATA = '/resource-allocation/get-resources';

/*------------- login --------------*/
export const USER_LOGIN = 'user/login';

/*--------------Admin details -----------*/
export const GET_ADMIN_DETAILS = 'user/userinfo';

/*------------- IT admin airport Master --------------*/
export const POST_LICENSE = 'airport-license';
export const GET_LICENSE = 'airport-license/paginated/';
export const GET_AIRPORT_NAME = 'global-airport/paginated';

/*------------------ Seasonal Plans --------------------- */
export const GET_SEASONAL_PLANS = '/seasonalPlan/getPlans';
export const POST_SEASONAL_PLANS = '/seasonalPlan/createPlan';
export const EDIT_SEASONAL_PLANS_ARRIVAL = '/seasonalPlan/arrival';
export const EDIT_SEASONAL_PLANS_DEPARTURE = 'seasonalPlan/departure';
export const UPLOAD_CSV_BULK = '/seasonalPlan/bulkPlans';

/*------------- IT admin Global Master --------------*/
export const GET_GLOBAL_AIRPORT = '/global-airport/paginated';
export const POST_GLOBAL_AIRPORT = '/global-airport/';
export const PATCH_GLOBAL_AIRPORT = '/global-airport/';
export const DELETE_GLOBAL_AIRPORT = '/global-airport/';
export const POST_BULK_GLOBAL_AIRPORT = '/global-airport/upload/';

export const POST_BAGGED_BELT = '';
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
export const GET_MILESTONE_DATA = '/milestone/paginated'

/*--------------------------planner airport master ---------------------*/

export const GET_CHECKIN_COUNTER = '/checkin-counter/paginated';
export const CHECKIN_COUNTER = '/checkin-counter';
export const GET_GATE = '/gate/paginated';
export const GATE = '/gate';
export const GET_PARKING_STAND = '/parking-stand/paginated'
export const PARKING_STAND = '/parking-stand'
export const GET_TAXIWAY = '/taxiway/paginated';
export const TAXIWAY = '/taxiway';
export const GET_BAGGAGE_BELT = '/baggage-belt/paginated';
export const BAGGAGE_BELT = '/baggage-belt';
export const GET_RUNWAY = '/runway/paginated';
export const RUNWAY = '/runway';
export const GET_TERMINAL = '/terminal/paginated';
export const TERMINAL = '/terminal';


/*--------------------------planner aircraft master ---------------------*/

export const GET_PLANNER_AIRCRAFT = '/planner-aircraft/paginated';
export const POST_PLANNER_AIRCRAFT = '/planner-aircraft/';
export const DELETE_PLANNER_AIRCRAFT = '/planner-aircraft';

/*--------------------------planner airline master ---------------------*/

export const GET_PLANNER_AIRLINE = '/planner-airline/paginated';
export const POST_PLANNER_AIRLINE = '/planner-airline';
export const DELETE_PLANNER_AIRLINE = '/planner-airline';
