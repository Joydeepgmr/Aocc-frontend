import { createAsyncThunk } from '@reduxjs/toolkit';
import { Server } from '../../../../server';

export const setUserNameAction = (state, action) => {
	state.user_name = action.payload;
};


export const UsersFetchAction = createAsyncThunk('dashboard/Users', () => {

	Server.get('/users').then((response) => response);
});
