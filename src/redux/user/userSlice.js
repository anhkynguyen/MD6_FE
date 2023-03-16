import {createSlice} from "@reduxjs/toolkit";
import {login, register} from "../../service/userService";

const initialState = {
    user: localStorage.getItem('user') === undefined ? {
        username: null,
        password: null
    }: JSON.parse(localStorage.getItem('user')),
    user1: [],
    profile: [],
    profile1: {},
    checkPassword: ""
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action)=>{
            state.user = action.payload.data
            localStorage.setItem('user', JSON.stringify(action.payload.data))
            localStorage.setItem('access_token', JSON.stringify(action.payload.data.token))
        })

        builder.addCase(register.fulfilled, (state, action)=>{
            state.user1.push(action.payload)

        })
        // builder.addCase(getProfile.fulfilled, (state, action)=>{
        //     state.profile = action.payload
        // })
        // builder.addCase(editProfile.fulfilled,(state,action)=>{
        //     state.user1 = action.payload;
        //     localStorage.setItem('user', JSON.stringify(action.payload.data))
        //     localStorage.setItem('access_token', JSON.stringify(action.payload.data.token))
        //
        // })
        // builder.addCase(changePassword.fulfilled,(state,action)=>{
        //     state.checkPassword = action.payload
        // })
    }
})
export default userSlice.reducer