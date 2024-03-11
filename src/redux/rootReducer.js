// import { combineReducers } from 'redux';

// import { app } from './app/reducer';

import { planAirportMasterSlice } from "../views/afterAuth/planairportMaster/redux/reducer"
import { dashboardSlice } from '../views/afterAuth/dashboard/redux/reducer';

export const rootReducer = {
	dashboard: dashboardSlice.reducer,
	planAirportMaster: planAirportMasterSlice.reducer,
	
};
