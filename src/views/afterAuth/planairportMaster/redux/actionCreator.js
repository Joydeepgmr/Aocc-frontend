import { createAsyncThunk } from '@reduxjs/toolkit';

export const addAircraftRegistration = createAsyncThunk('airportMater/addAircraftRegistration', (value) => {
	const finalData = [value];
	console.log("ajjbb", finalData);
	return finalData;
});
export const updateAircraftRegistration = createAsyncThunk('airportMater/ updateAircraftRegistration', (id) => {
	const finalData = [id];
	return finalData;
});
export const deleteAircraftRegistration = createAsyncThunk('airportMater/ deleteAircraftRegistration', (id) => {
	console.log("asbbdbdbh", id);
	const finalData = [id];
	return finalData;
});