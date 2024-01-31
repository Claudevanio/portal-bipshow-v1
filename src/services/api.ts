import { Cache } from "@/adapters";
import { appToken, baseUrl } from "@/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: appToken,
  },
});

export const apiTokeUser = axios.create({
  baseURL: baseUrl,
});

apiTokeUser.interceptors.request.use((request) => {
  const token = Cache.get({ key: "@tokenUser" });
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
