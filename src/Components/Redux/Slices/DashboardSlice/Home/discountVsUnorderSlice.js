import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const discountVsUnorder = createAsyncThunk("discountVsUnorder-Function", async (date)=>{
    
    const res = await axios.get(`/adminstrator/dashboard/orders/discount-vs-non/?start_date=${date.start_date}&end_date=${date.end_date}`)
    return res
})


export const DiscountVSunOrderSlice = createSlice({
    name : "discountVsUnorder Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [discountVsUnorder.pending] : (state)=>{
            state.loading = true
        },
        [discountVsUnorder.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
        },
        [discountVsUnorder.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
        }
    }

})

export const {} = DiscountVSunOrderSlice.actions

export default DiscountVSunOrderSlice.reducer