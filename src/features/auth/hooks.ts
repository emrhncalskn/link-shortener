import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { login, register } from "./api";
import { LoginRequest, RegisterRequest } from "./types";

export const useLogin = (
  options?: UseMutationOptions<any, any, LoginRequest>
) => {
  const query = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    ...options,
  });
  return query;
};

export const useRegister = (
  options?: UseMutationOptions<any, any, RegisterRequest>
) => {
  const query = useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    ...options,
  });
  return query;
};
