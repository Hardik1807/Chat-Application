import {createSlice} from "@reduxjs/toolkit"

const msgslice = createSlice({
    name:"mesaage",
    initialState: { 
        msg : null,
    },
    reducers : {
        setmsg:(state,action)=>{
            state.msg = action.payload;
        }
    }
})

export const {setmsg} = msgslice.actions
export default msgslice.reducer;