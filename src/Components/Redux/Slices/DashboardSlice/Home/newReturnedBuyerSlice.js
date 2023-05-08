import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const newReturnedBuyer = createAsyncThunk("newReturnedBuyer-Function", async ()=>{
    
    const res = await axios.get('/adminstrator/dashboard/customers/new-vs-returned/')
    return res
})


export const NewReturnedBuyerSlice = createSlice({
    name : "New VS Returned Buyer Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [newReturnedBuyer.pending] : (state)=>{
            state.loading = true
        },
        [newReturnedBuyer.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
            // console.log(action.payload);
        },
        [newReturnedBuyer.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = NewReturnedBuyerSlice.actions

export default NewReturnedBuyerSlice.reducer