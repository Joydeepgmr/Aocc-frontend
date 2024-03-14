// import { combineReducers } from 'redux';

// import { app } from './app/reducer';

import { PlannerAirportMasterSlice } from '../views/afterAuth/plannerairportMaster/redux/reducer';
import { dashboardSlice } from '../views/afterAuth/dashboard/redux/reducer';
import { globalMastersSlice } from '../views/afterAuth/globalMasters/redux/reducer';
import { airportMastersSlice } from '../views/afterAuth/airportMasters/redux/reducer';

export const rootReducer = {
	dashboard: dashboardSlice.reducer,
	PlannerAirportMaster: PlannerAirportMasterSlice.reducer,

	globalMasters: globalMastersSlice.reducer,
	airportMasters: airportMastersSlice.reducer,
};
