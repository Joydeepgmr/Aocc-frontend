import { dashboardSlice } from '../views/afterAuth/dashboard/redux/reducer';
import { globalMastersSlice } from '../views/afterAuth/globalMasters/redux/reducer';
import { airportMastersSlice } from '../views/afterAuth/airportMasters/redux/reducer';

export const rootReducer = {
	// app,
	dashboard: dashboardSlice.reducer,
	globalMasters: globalMastersSlice.reducer,
	airportMasters: airportMastersSlice.reducer,
};
