import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "./api";

export const useGetUserProfile = () => {
  return useQuery<any, Error>({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { username?: string; password?: string }>({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: deleteUserProfile,
    onSuccess: () => {
      queryClient.clear();
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
  });
};
