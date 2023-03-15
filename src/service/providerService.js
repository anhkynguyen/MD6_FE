import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProviders = createAsyncThunk(
    'post/getPosts',
    async ()=>{
        const res = await customAxios.get('post');
        return res.data
    }
);
export const findByIdProvider = createAsyncThunk(
    'post/findByIdPost',
    async (data)=>{
        const res = await customAxios.get('post/findById/'+data);
        return res.data;
    }
)

export const addProvider = createAsyncThunk(
    'post/addPost',
    async (data)=>{
        const res = await customAxios.post('/post/add', data);
        return res.data
    }
);
export const removeProvider = createAsyncThunk(
    'post/removePost',
    async (data)=>{
        const res = await customAxios.delete('post/remove/'+ data);
        return data
    }
);

export const editProvider = createAsyncThunk(
    'post/editPost',
    async (data)=>{

        // let id = Number(data[1])
        // console.log(11111111111111,data,id)
        await customAxios.put('post/edit/' + data[1] , data[0]);
        const res = await customAxios.get('post');
        console.log(9999999999999,res.data)
        return res.data

    }
)