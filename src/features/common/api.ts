import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("token") || ""}`,
  },
});

export default apiInstance;
