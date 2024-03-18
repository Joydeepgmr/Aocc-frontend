import { createSlice } from '@reduxjs/toolkit';
import initialState from './planState';

import { addArrivalAction } from './planActionCreator';

export const planSlice = createSlice({
	name: 'plans',
	initialState,
	reducers: {
		addArrival: (state, action) => {
			state.additionalArrivalData.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addArrivalAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(addArrivalAction.fulfilled, (state, action) => {
			console.log(action);
			state.loading = false;
			state.error = '';
			state.arrivalData = action.payload;
		});
		builder.addCase(addArrivalAction.rejected, (state, action) => {
			state.loading = false;
			state.users = [];
			state.error = action.error.message;
		});
	},
});

export const { addArrival} = planSlice.actions;

export default planSlice.reducer;
