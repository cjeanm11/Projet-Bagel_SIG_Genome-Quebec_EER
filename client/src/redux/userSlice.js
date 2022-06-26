import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        toggleLogin: (state) =>{
            state.loggedIn = !state.loggedIn
        }
    }
})


export const { toggleLogin } = userSlice.actions
export default userSlice.reducer
