import { createSlice } from '@reduxjs/toolkit';
import { addAircraftRegistration } from './actionCreator';
import initialState from './state';

export const PlannerAirportMasterSlice = createSlice({
	name: 'PlannerAirportMaster',
	initialState,
	reducers: {
		updateIsShowTableComponents: (state) => {
			state.isShowTableComponents = true;
		},
		formDisabled: (state, action) => {
			state.disabled = !state.disabled;
		},
		updateAircraftRegistration: (state, action) => {
			state.additionalAircraftRegistration = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addAircraftRegistration.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(addAircraftRegistration.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
			state.addAircraft = action.payload;
		});
		builder.addCase(addAircraftRegistration.rejected, (state, action) => {
			state.loading = false;
			state.addAircraft = [];
			state.error = action.error.message;
		});
	},
});

export const { addAircraft, formDisabled, updateIsShowTableComponents } = PlannerAirportMasterSlice.actions;

export default PlannerAirportMasterSlice.reducer;
