import {createSlice} from "@reduxjs/toolkit"


const userslice = createSlice({
    name:"user",
    initialState: { 
        authuser : null,
        Otheruser : null,
        selecteduser : null,
        onlineUsers:null
    },
    reducers : {
        setauthuser:(state,action)=>{
            state.authuser = action.payload;
        },
        setotheruser:(state,action)=>{
            state.Otheruser = action.payload;
        },
        setselecteduser:(state,action)=>{
            state.selecteduser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        }
    }
})

export const {setauthuser,setotheruser,setselecteduser,setOnlineUsers} = userslice.actions
export default userslice.reducer;