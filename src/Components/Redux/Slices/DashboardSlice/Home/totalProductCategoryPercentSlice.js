import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const categoryPercent = createAsyncThunk("categoryPercent-Function", async ()=>{
    const res = await axios.get('/adminstrator/dashboard/category/percentage/')
    return res
})


export const CategoryPercentSlice = createSlice({
    name : "Category Percent Slice",
    initialState : {
        data : [],
        error : "",
        loading : false
    },
    reducers : {

    },
    extraReducers: {
        [categoryPercent.pending] : (state)=>{
            state.loading = true
        },
        [categoryPercent.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data.data
            state.error = ""
            // console.log(action.payload);
        },
        [categoryPercent.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = CategoryPercentSlice.actions

export default CategoryPercentSlice.reducer