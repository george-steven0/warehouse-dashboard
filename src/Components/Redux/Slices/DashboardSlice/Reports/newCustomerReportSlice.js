import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const newCutomerReport = createAsyncThunk("newCutomerReport-Function", async (page)=>{
    
    const res = await axios.get(`/adminstrator/dashboard/report/customer-sales/?page=${page === undefined ? 1 : page}`)
    return res
})


export const NewCustomerReportSlice = createSlice({
    name : "New Customer Report Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [newCutomerReport.pending] : (state)=>{
            state.loading = true
        },
        [newCutomerReport.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
            // console.log(action.payload);
        },
        [newCutomerReport.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = NewCustomerReportSlice.actions

export default NewCustomerReportSlice.reducer