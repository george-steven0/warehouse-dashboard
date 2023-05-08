import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const vedorSeller = createAsyncThunk("vedorSeller-Function", async (page)=>{

    const res = await axios.get(`/adminstrator/dashboard/vendors/sales/?page=${page === undefined ? 1 : page}`)
    return res.data
})


export const VendorSellerSlice = createSlice({
    name : "Seller Overview Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [vedorSeller.pending] : (state)=>{
            state.loading = true
        },
        [vedorSeller.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = ""
        },
        [vedorSeller.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
        }
    }

})

export const {} = VendorSellerSlice.actions

export default VendorSellerSlice.reducer