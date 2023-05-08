import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export const MessageSlice = createSlice({
    name : "Message Slice",
    initialState : {
        message : "",
    },
    reducers : {
        error : (state,action)=>( toast.error( action.payload, { toastId : 'error1' })),

        success : (state,action)=>( toast.success( action.payload, { toastId : 'success1' })),
    }

})

export const {error, success} = MessageSlice.actions

export default MessageSlice.reducer