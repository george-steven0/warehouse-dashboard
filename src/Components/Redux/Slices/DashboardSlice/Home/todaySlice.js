import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const today = createAsyncThunk("today-Function", async ()=>{
    const res = await axios.get('/adminstrator/dashboard/today/')
    return res
})


export const todaySlice = createSlice({
    name : "Today Slice",
    initialState : {
        todayData : [],
        error : "",
        loading : false
    },
    reducers : {

    },
    extraReducers: {
        [today.pending] : (state)=>{
            state.loading = true
        },
        [today.fulfilled] : (state,action)=>{
            state.loading = false
            state.todayData = action.payload.data
            state.error = ""
            // console.log(action.payload);
        },
        [today.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = todaySlice.actions

export default todaySlice.reducer