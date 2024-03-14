import { createSlice } from '@reduxjs/toolkit';
import initialState from './state'

import { addAirportLicenseAction } from './actionCreator';

export const airportMastersSlice = createSlice({
    name: "airportMasters",
    initialState,
    reducers: {
        addAirportLicense: (state, action) => {
            state.additionalAirportLicenseData.push(action.payload);
        },
        formDisabled: (state, action) => {
            state.disabled = !state.disabled;
        },
        updateLicenseData: (state, action) => {
            state.additionalAirportLicenseData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addAirportLicenseAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addAirportLicenseAction.fulfilled, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = '';
            state.airportLicenseData = action.payload;
        });
        builder.addCase(addAirportLicenseAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },

})

export const {addAirportLicense, formDisabled, updateLicenseData} = airportMastersSlice.actions

export default airportMastersSlice.reducer;