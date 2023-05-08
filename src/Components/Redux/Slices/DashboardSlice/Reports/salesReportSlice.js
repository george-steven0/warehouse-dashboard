import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const salesReport = createAsyncThunk("salesReport-Function", async (page)=>{
    
    const res = await axios.get(`/adminstrator/dashboard/report/sales/?page=${page === undefined ? 1 : page}`)
    return res
})


export const SalesReportSlice = createSlice({
    name : "Sales Report Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [salesReport.pending] : (state)=>{
            state.loading = true
        },
        [salesReport.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
            // console.log(action.payload);
        },
        [salesReport.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = SalesReportSlice.actions

export default SalesReportSlice.reducer