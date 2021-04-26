import axios from "axios";
import Token from "./Token";
const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8383/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: 10000,
})


//const token =   Token.getToken();
const token =    localStorage.getItem('user-token');

if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default apiClient;
