import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";


export const getOrderInUser = createAsyncThunk(
    "order/getAllOrdersInUser", async (data) => {
        try {
            const res = await customAxios.get("/order/getAllOrdersInUser/" + data); // data là idUser
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
export const getOrderInSeller = createAsyncThunk(
    "order/getAllOrdersInSeller", async (data) => {
        try {
            const res = await customAxios.get("/order/getAllOrdersInSeller/" + data); // data là idPost
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
);
export const addOrder = createAsyncThunk(
    "order/addOrder", async (data) => {
        try {
            const res = await customAxios.post("/order/add", data);
            return res.data
        } catch (e) {
            console.log(e)
        }
    }
)
export const changeStatusOrder = createAsyncThunk(
    "order/changeStatusOrder", async (data) => {
        console.log(data,32)
        await customAxios.get("order/changeStatusOrder/" + data);
        console.log(data,34)
        return data

    }
)

export const changeStatusOrderInUser = createAsyncThunk(
    "order/changeStatusOrderInUser", async (data)=>{
        await customAxios.get("order/changeStatusOrderInUser/" + data);
        return data
    }
)

export const getOrderAdmin = createAsyncThunk("order/getAllOrders", async ()=>{
    console.log(11111111111111)
    const res =await customAxios.get("order/getAllOrders");
    console.log(res.data, 67)
    return res.data
})