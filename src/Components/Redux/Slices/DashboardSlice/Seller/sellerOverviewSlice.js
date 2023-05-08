import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sellerOveview = createAsyncThunk("sellerOveview-Function", async (date)=>{

    const res = await axios.get(`/adminstrator/dashboard/sellers/overview/?start_date=${date.start_date}&end_date=${date.end_date}`)

    return res.data
})


export const SellerOverviewSlice = createSlice({
    name : "Seller Overview Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [sellerOveview.pending] : (state)=>{
            state.loading = true
        },
        [sellerOveview.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
        },
        [sellerOveview.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
        }
    }

})

export const {} = SellerOverviewSlice.actions

export default SellerOverviewSlice.reducer