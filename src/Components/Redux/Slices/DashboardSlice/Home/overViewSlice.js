import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { error, success } from "../Messages/messageSlice";

export const overView = createAsyncThunk("overview-Function", async (date,{dispatch})=>{
    // const res = await axios.get(`/adminstrator/dashboard/overview/?start_date=${date.start_date}&end_date=${date.end_date}`)

    try{
        const res = await toast.promise(
            axios.get(`/adminstrator/dashboard/overview/?start_date=${date.start_date}&end_date=${date.end_date}`),
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


export const OverviewSlice = createSlice({
    name : "Overview Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [overView.pending] : (state)=>{
            state.loading = true
        },
        [overView.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = ""
            
        },
        [overView.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
        }
    }

})

export const {} = OverviewSlice.actions

export default OverviewSlice.reducer