import axios from "axios";
import { constants } from "../utils/constants";

export const baseApi = axios.create({
  baseURL: "http://localhost:8080/api/iota"
})


baseApi.interceptors.request.use(config => {
  const token = localStorage.getItem(constants.tokenStorage)

  config.headers.Authorization = `Bearer ${token}`

  return config
})