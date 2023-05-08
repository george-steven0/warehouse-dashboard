import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const countryPercent = createAsyncThunk("country-Function", async ()=>{
    
    const res = await axios.get('/adminstrator/dashboard/country/percentage/')
    return res
})


export const CountrySlice = createSlice({
    name : "Country Percentage Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [countryPercent.pending] : (state)=>{
            state.loading = true
        },
        [countryPercent.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
            // console.log(action.payload);
        },
        [countryPercent.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = CountrySlice.actions

export default CountrySlice.reducer