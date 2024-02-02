import axios, { AxiosInstance } from "axios";

export const httpInstance = (token: string | null): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout: 10000,
  });

  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  axiosInstance.defaults.headers.post["Content-Type"] = "application/json"
  return axiosInstance
}
