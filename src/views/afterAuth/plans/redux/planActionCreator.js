import { createAsyncThunk } from '@reduxjs/toolkit';

export const addArrivalAction = createAsyncThunk('plans/addArrivalAction', (data) => {
	const finalData = [data];
	return finalData;
});
