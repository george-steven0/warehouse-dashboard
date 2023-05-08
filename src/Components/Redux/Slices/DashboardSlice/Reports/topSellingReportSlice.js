import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const topSellingReport = createAsyncThunk("topSellingReport-Function", async (page)=>{
    
    const res = await axios.get(`/adminstrator/dashboard/report/top-selling/?page=${page === undefined ? 1 : page}`)
    return res
})


export const TopSellingReportSlice = createSlice({
    name : "Top Selling Report Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [topSellingReport.pending] : (state)=>{
            state.loading = true
        },
        [topSellingReport.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
            console.log(action);
        },
        [topSellingReport.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = TopSellingReportSlice.actions

export default TopSellingReportSlice.reducer