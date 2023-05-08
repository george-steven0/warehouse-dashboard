import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { error, success } from "../Messages/messageSlice";

export const failedOrder = createAsyncThunk("failedOrder-Function", async (date,{dispatch})=>{
    // const res = await axios.get(`/adminstrator/dashboard/overview/?start_date=${date.start_date}&end_date=${date.end_date}`)

    try{
        const res = await toast.promise(
            axios.get(`/adminstrator/dashboard/sales-failed/percentage/`),
            {
                pending: 'Promise is pending',
                success: 'Promise resolved',            
            },
            { toastId : 'Promise1' }
        )
        return res.data
    } catch (e){
        dispatch(error(e.message))
    }
    
    // return res.data
})


export const FailedOrderSlice = createSlice({
    name : "Failed Order Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [failedOrder.pending] : (state)=>{
            state.loading = true
        },
        [failedOrder.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = ""
            
        },
        [failedOrder.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
        }
    }

})

export const {} = FailedOrderSlice.actions

export default FailedOrderSlice.reducer