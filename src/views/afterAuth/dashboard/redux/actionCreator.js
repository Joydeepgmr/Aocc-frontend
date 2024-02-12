import { createAsyncThunk } from '@reduxjs/toolkit';
import { Server } from '../../../../server';

export const setUserNameAction = (state, action) => {
	state.user_name = action.payload;
};

// ---------- API CALL ----------
// Generates pending, fulfilled and rejected action types
export const UsersFetchAction = createAsyncThunk('dashboard/Users', () => {
	// TODO: --- USING AXIOS ---
	// return axios
	// 	.get('https://jsonplaceholder.typicode.com/users')
	// 	.then(response => response.data)

	// TODO: --- USING FETCH API ---
	// return fetch("https://jsonplaceholder.typicode.com/users", {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-type": "application/json",
	// 	}
	// }).then(response => response.json())
	// 	.then(response => {
	// 		return response;
	// 	})

	// TODO: ----------- USING CUSTOM -----------
	Server.get('/users').then((response) => response);
});
