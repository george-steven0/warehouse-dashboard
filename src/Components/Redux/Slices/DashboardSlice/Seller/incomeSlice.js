import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { error, success } from "../Messages/messageSlice";

export const income = createAsyncThunk("income-Function", async (date,{dispatch})=>{
    // const res = await axios.get(`/adminstrator/dashboard/overview/?start_date=${date.start_date}&end_date=${date.end_date}`)

    try{
        const res = await toast.promise(
            axios.get(`/adminstrator/dashboard/income/per-day/?start_date=${date.start_date}&end_date=${date.end_date}`),
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


export const IncomeSlice = createSlice({
    name : "income Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [income.pending] : (state)=>{
            state.loading = true
        },
        [income.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = ""
            
        },
        [income.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
        }
    }

})

export const {} = IncomeSlice.actions

export default IncomeSlice.reducer