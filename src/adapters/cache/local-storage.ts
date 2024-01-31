"use client";

import { GetStorage, RemoveStorage, SetStorage } from "../../types";

export const get: GetStorage = ({ key }) => {
  if (typeof window === "undefined") {
    return;
  }
  const value = localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};

export const set: SetStorage = ({ key, value }) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const remove: RemoveStorage = ({ key }) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(key);
};
