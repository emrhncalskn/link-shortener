import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteLink,
  getLinkStats,
  getMyLinks,
  shortenUrl,
  updateLinkCustomCode,
} from "./api";
import {
  GetLinksResponse,
  LinkResponse,
  LinkStatsResponse,
  ShortenUrlRequest,
  ShortenUrlResponse,
} from "./types";

export const useShortenUrl = () => {
  return useMutation<ShortenUrlResponse, Error, ShortenUrlRequest>({
    mutationFn: shortenUrl,
  });
};

export const useGetMyLinks = (page: number = 1, limit: number = 10) => {
  return useQuery<GetLinksResponse, Error>({
    queryKey: ["my-links", page, limit],
    queryFn: () => getMyLinks(page, limit),
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-links"] });
    },
  });
};

export const useGetLinkStats = (shortCode: string) => {
  return useQuery<LinkStatsResponse, Error>({
    queryKey: ["link-stats", shortCode],
    queryFn: () => getLinkStats(shortCode),
    enabled: !!shortCode,
  });
};

export const useUpdateLinkCustomCode = () => {
  const queryClient = useQueryClient();

  return useMutation<
    LinkResponse,
    Error,
    { shortCode: string; newCustomCode: string }
  >({
    mutationFn: ({ shortCode, newCustomCode }) =>
      updateLinkCustomCode(shortCode, newCustomCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-links"] });
    },
  });
};
