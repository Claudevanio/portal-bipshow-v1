'use client';
import { Cache } from "@/adapters";
import { appToken, baseUrl, baseUrlNotificacoes } from "@/constants";
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

export const apiNotificacoes = axios.create({
  baseURL: baseUrlNotificacoes,
  headers: {
    apiKey: '59d7547b-cc92-48b9-98a1-fdad9603ef2a'
  },
});

apiTokeUser.interceptors.request.use((request) => {
  const token = Cache.get({ key: "@tokenUser" });
  const tokenFromQuery = new URLSearchParams(window.location.search).get("tokenUser");
  if (token || tokenFromQuery) {
    request.headers.Authorization = `Bearer ${tokenFromQuery ?? token}`;
  }
  return request;
});
