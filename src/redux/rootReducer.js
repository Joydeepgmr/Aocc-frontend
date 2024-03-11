// import { combineReducers } from 'redux';

// import { app } from './app/reducer';
import { AirportMasterSlice } from '../views/afterAuth/airportMaster/redux/reducer';
import { dashboardSlice } from '../views/afterAuth/dashboard/redux/reducer';

export const rootReducer = {
	// app,
	dashboard: dashboardSlice.reducer,
	AirportMaster:AirportMasterSlice.reducer,
};
