import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const lowInventoryReport = createAsyncThunk("lowInventory-Function", async (page)=>{
    
    const res = await axios.get(`/adminstrator/dashboard/report/low-inventory/?page=${page === undefined ? 1 : page}`)
    return res
})


export const LowInventorySlice = createSlice({
    name : "Low Inventory Report Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [lowInventoryReport.pending] : (state)=>{
            state.loading = true
        },
        [lowInventoryReport.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
            // console.log(action.payload);
        },
        [lowInventoryReport.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = LowInventorySlice.actions

export default LowInventorySlice.reducer