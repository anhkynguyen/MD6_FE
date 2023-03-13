import axios from "axios";
const token = localStorage.getItem("access_token") === "undefined"? '' : JSON.parse(localStorage.getItem("access_token"));
console.log(token)
const customAxios = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default customAxios;