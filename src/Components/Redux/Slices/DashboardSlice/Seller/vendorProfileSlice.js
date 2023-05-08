import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const vendorProfile = createAsyncThunk("vendorProfile-Function", async (id)=>{

    const res = await axios.get(`/adminstrator/dashboard/vendor-profile/${id}`)

    return res.data
})


export const VendorProfileSlice = createSlice({
    name : "Vendor Profile Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [vendorProfile.pending] : (state)=>{
            state.loading = true
        },
        [vendorProfile.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = ""
        },
        [vendorProfile.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
        }
    }

})

export const {} = VendorProfileSlice.actions

export default VendorProfileSlice.reducer