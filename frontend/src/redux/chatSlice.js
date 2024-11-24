import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState : {
        onlineUsers:[],
        messages: []
    },
    reducers : {
        setOnlineUsers: (state, action)=>{
            state.onlineUsers = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload; // Ensure action.payload contains the correct array
            
        },
    }
})

export const {setOnlineUsers, setMessages} = chatSlice.actions
export default chatSlice.reducer