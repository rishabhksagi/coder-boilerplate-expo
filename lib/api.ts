import axios from "axios";

export const api = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API Error]", error?.message);
    return Promise.reject(error);
  }
);
