import { createAsyncThunk } from '@reduxjs/toolkit';

export const addAirportLicenseAction = createAsyncThunk('airportMasters/addAirportLicenseAction', (data) => {
    const finalData = [data];
    return finalData;
});