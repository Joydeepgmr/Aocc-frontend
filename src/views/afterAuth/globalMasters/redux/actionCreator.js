import { createAsyncThunk } from '@reduxjs/toolkit';

// ---------- API CALL ----------
// Generates pending, fulfilled and rejected action types

export const addAirportAction = createAsyncThunk('globalMasters/addAirportAction', (data) => {
	const finalData = [data];
	return finalData;
});