import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { error, success } from "../Messages/messageSlice";

export const review = createAsyncThunk("review-Function", async (date,{dispatch})=>{
    // const res = await axios.get(`/adminstrator/dashboard/overview/?start_date=${date.start_date}&end_date=${date.end_date}`)

    try{
        const res = await toast.promise(
            axios.get(`/adminstrator/dashboard/reviews/per-day/?start_date=${date.start_date}&end_date=${date.end_date}`),
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


export const ReviewSlice = createSlice({
    name : "review Slice",
    initialState : {
        data : [],
        error : "",
        loading : false,
    },
    reducers : {

    },
    extraReducers: {
        [review.pending] : (state)=>{
            state.loading = true
        },
        [review.fulfilled] : (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = ""
            
        },
        [review.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
        }
    }

})

export const {} = ReviewSlice.actions

export default ReviewSlice.reducer