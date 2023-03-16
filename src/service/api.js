// import axios from "axios";
// const token = localStorage.getItem("access_token") === "undefined" ? '' : JSON.parse(localStorage.getItem("access_token"));
// console.log(1, token);
// const customAxios = axios.create({
//   baseURL: 'http://localhost:3000/',
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
//
// export default customAxios;

import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.getItem("access-token"),
  },
});
export default customAxios;
