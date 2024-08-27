import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';

import { setUserNameAction, UsersFetchAction } from './actionCreator';

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		setUserName: setUserNameAction,
	},
	extraReducers: (builder) => {
		builder.addCase(UsersFetchAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(UsersFetchAction.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
			state.error = '';
		});
		builder.addCase(UsersFetchAction.rejected, (state, action) => {
			state.loading = false;
			state.users = [];
			state.error = action.error.message;
		});
	},
});

export const { setUserName } = dashboardSlice.actions;

export default dashboardSlice.reducer;
