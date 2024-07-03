import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
    name:'socket',
    initialState : {
        socket: null,
    },
    reducers: {
        setSocketId(state, action) {
            // console.log(action.payload)
            state.socket = action.payload;
            // console.log(state.socket)
        },

    },
});

export const {setSocketId} = socketSlice.actions;
export default socketSlice.reducer;
