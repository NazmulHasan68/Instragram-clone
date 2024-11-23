import { createSlice } from "@reduxjs/toolkit"; 

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user:null,
        suggestedUsers : [],
        userProfile:null
    },
    reducers : {
        setAuthUser :(state, action) =>{
            state.user = action.payload;
        },
        setSuggestedUser :(state, action)=>{
            state.suggestedUsers = action.payload
        },
        setUserProfile : (state, action)=>{
            state.userProfile = action.payload
        }
    }
})

export const {setAuthUser, setSuggestedUser, setUserProfile} = authSlice.actions
export default authSlice.reducer