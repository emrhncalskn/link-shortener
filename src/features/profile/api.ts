import apiInstance from "../common/api";

export const getUserProfile = async (): Promise<any> => {
  const response = await apiInstance.get("/user");
  return response.data.data;
};

export const updateUserProfile = async (data: {
  username?: string;
  password?: string;
}): Promise<any> => {
  const response = await apiInstance.put("/user", data);
  return response.data.data;
};

export const deleteUserProfile = async (): Promise<void> => {
  const response = await apiInstance.delete("/user");
  return response.data.data;
};
