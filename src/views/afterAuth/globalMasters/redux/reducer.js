import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';

import { addAirportAction } from './actionCreator';

export const globalMastersSlice = createSlice({
	name: 'globalMasters',
	initialState,
	reducers: {
		addAirport: (state, action) => {
			state.additionalAirportData.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addAirportAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(addAirportAction.fulfilled, (state, action) => {
			console.log(action);
			state.loading = false;
			state.error = '';
			state.airportData = action.payload;
		});
		builder.addCase(addAirportAction.rejected, (state, action) => {
			state.loading = false;
			state.users = [];
			state.error = action.error.message;
		});
	},
});

export const { addAirport } = globalMastersSlice.actions;

export default globalMastersSlice.reducer;
