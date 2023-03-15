import axios from "axios";
console.log(localStorage.getItem("access-token"));
const customAxios = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.getItem("access-token"),
  },
});
export default customAxios;
