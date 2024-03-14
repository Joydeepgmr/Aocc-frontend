import { createSlice } from "@reduxjs/toolkit";
import initialState from './state';
export const airportMasterSlice = createSlice({
    name: "airportMaster",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(UsersFetchAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UsersFetchAction.fulfilled, (state, action) => {
            console.log(action);
            state.loading = false;
    
            state.error = '';
        });
        builder.addCase(UsersFetchAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
    
})
export default airportMasterSlice.reducer;