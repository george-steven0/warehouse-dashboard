import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const newUserVsReturned = createAsyncThunk("newUserVsReturned-Function", async (date)=>{
    const res = await axios.get(`/adminstrator/dashboard/orders/newuser-vs-returned/?start_date=${date.start_date}&end_date=${date.end_date}`)
    return res
})


export const NewUserVsReturnedSlice = createSlice({
    name : "New User VS Returned Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [newUserVsReturned.pending] : (state)=>{
            state.loading = true
        },
        [newUserVsReturned.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload.data
            state.error = ""
            // console.log(action.payload);
        },
        [newUserVsReturned.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = NewUserVsReturnedSlice.actions

export default NewUserVsReturnedSlice.reducer