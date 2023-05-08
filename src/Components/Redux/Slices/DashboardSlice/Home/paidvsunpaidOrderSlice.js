import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const paidvsunpaid = createAsyncThunk("paidVSunPaid-Function", async (date)=>{
    
    const res = await axios.get(`/adminstrator/dashboard/orders/paid-vs-un/?start_date=${date.start_date}&end_date=${date.end_date}`)
    return res
})


export const PaidVSUnPaid = createSlice({
    name : "Paid VS Unpaid Order Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [paidvsunpaid.pending] : (state)=>{
            state.loading = true
        },
        [paidvsunpaid.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
            // console.log(action.payload);
        },
        [paidvsunpaid.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = PaidVSUnPaid.actions

export default PaidVSUnPaid.reducer