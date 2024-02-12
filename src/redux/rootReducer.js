// import { combineReducers } from 'redux';

// import { app } from './app/reducer';
import { dashboardSlice } from '../views/afterAuth/dashboard/redux/reducer';

export const rootReducer = {
	// app,
	dashboard: dashboardSlice.reducer,
};
