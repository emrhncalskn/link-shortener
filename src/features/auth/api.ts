import apiInstance from "../common/api";
import { LoginRequest, RegisterRequest } from "./types";

export const login = async ({ username, password }: LoginRequest) => {
  const response = await apiInstance.post("/auth/login", {
    username,
    password,
  });
  return response.data.data;
};

export const register = async ({ username, password }: RegisterRequest) => {
  const response = await apiInstance.post("/auth/register", {
    username,
    password,
  });
  return response.data.data;
};

export const isAuthenticated = async () => {
  const response = await apiInstance.get("/auth/check");
  return response.data.data;
};
