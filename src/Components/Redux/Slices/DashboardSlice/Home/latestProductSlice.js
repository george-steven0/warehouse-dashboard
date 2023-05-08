import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const latestProduct = createAsyncThunk("latest-Function", async ()=>{
    
    const res = await axios.get('/adminstrator/dashboard/products/latest/')
    return res
})


export const LatestProductSlice = createSlice({
    name : "Latest Added Product Slice",
    initialState : {
        latestProductData : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [latestProduct.pending] : (state)=>{
            state.loading = true
        },
        [latestProduct.fulfilled] : (state,action)=>{
            state.loading = false
            state.latestProductData = action.payload.data
            state.error = ""
            // console.log(action.payload);
        },
        [latestProduct.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = LatestProductSlice.actions

export default LatestProductSlice.reducer