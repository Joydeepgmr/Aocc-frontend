import { dashboardSlice } from '../views/afterAuth/dashboard/redux/reducer';
import { globalMastersSlice } from '../views/afterAuth/globalMasters/redux/reducer';

export const rootReducer = {
	// app,
	dashboard: dashboardSlice.reducer,
	globalMasters: globalMastersSlice.reducer,
};
