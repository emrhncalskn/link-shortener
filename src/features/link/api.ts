import apiInstance from "../common/api";
import {
  ShortenUrlRequest,
  ShortenUrlResponse,
  GetLinksResponse,
  LinkStatsResponse,
  LinkResponse,
} from "./types";

export const shortenUrl = async ({
  originalUrl,
  customCode,
}: ShortenUrlRequest): Promise<ShortenUrlResponse> => {
  const response = await apiInstance.post("/shorten", {
    originalUrl,
    customCode,
  });
  return response.data.data;
};

export const getMyLinks = async (
  page: number = 1,
  limit: number = 10
): Promise<GetLinksResponse> => {
  const response = await apiInstance.get(`/links?page=${page}&limit=${limit}`);
  return response.data.data;
};

export const getLinkStats = async (
  shortCode: string
): Promise<LinkStatsResponse> => {
  const response = await apiInstance.get(`/stats/${shortCode}`);
  return response.data.data;
};

export const updateLinkCustomCode = async (
  shortCode: string,
  newCustomCode: string
): Promise<LinkResponse> => {
  const response = await apiInstance.put(`/${shortCode}`, {
    customCode: newCustomCode,
  });
  return response.data.data;
};

export const deleteLink = async (shortCode: string): Promise<void> => {
  const response = await apiInstance.delete(`/${shortCode}`);
  return response.data.data;
};
