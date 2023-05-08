import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("Login-Function", async (data)=>{
    const res = await axios.post('/auth/login/',data)
    return res
})


export const loginSlice = createSlice({
    name : "Login Slice",
    initialState : {
        accessToken : "",
        error : "",
        loading : false
    },
    reducers : {

    },
    extraReducers: {
        [login.pending] : (state)=>{
            state.loading = true
        },
        [login.fulfilled] : (state,action)=>{
            state.loading = false
            state.accessToken = action.payload.data.access
            state.error = ""
            localStorage.setItem("acTK",action.payload.data.access)
        },
        [login.rejected] : (state,action)=>{
            state.loading = false
            state.error = "Something Went Wrong"
            // console.log(action.payload);
        }
    }

})

export const {} = loginSlice.actions

export default loginSlice.reducer