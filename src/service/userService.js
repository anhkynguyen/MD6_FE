import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";
// import axios from "axios";

export const login = createAsyncThunk(
    'users/login',
    async (data)=>{
        const res = await customAxios.post('users/login', data);
        return res
    }
)

export const register = createAsyncThunk(
    'users/register',
    async (data)=>{
        console.log(2)
        const res = await customAxios.post('/users/register',data);
        console.log(1,res.data)
        return res.data
    }
)

// export const getProfile = createAsyncThunk(
//     'users/my-profile',
//     async (data)=>{
//         const res = await customAxios.get('/users/my-profile/'+ data);
//         return res.data
//     }
// );

// export const editProfile = createAsyncThunk(
//     'users/:idUser',
//     async (data)=>{
//         await customAxios.put('users/' + data[1], data[0]);
//         const res = await customAxios.get('users');
//         return res.data
//     }
// )


// export const changePassword = createAsyncThunk(
//     'users/changePassword',
//     async (data)=>{
//         console.log(data)
//         const res = await customAxios.put('users/change-password/' + data[1], data[0]);
//         return res.data;
//     }
// )