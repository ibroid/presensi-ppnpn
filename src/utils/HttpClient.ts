import axios, { AxiosInstance } from "axios";

export const httpInstance = (token?: string | null): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout: 10000,
  });

  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  axiosInstance.defaults.withXSRFToken = true;
  axiosInstance.defaults.headers.common["Content-Type"] = "application/json"
  axiosInstance.defaults.headers.common["Accept"] = "application/json"
  return axiosInstance
}
