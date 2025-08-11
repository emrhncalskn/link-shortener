export interface LinkResponse {
  _id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateLinkInput {
  originalUrl: string;
  customCode?: string;
}

export interface LinkClick {
  _id: string;
  linkId: string;
  ipAddress?: string;
  userAgent?: string;
  clickedAt: Date | string;
}

export type ShortenUrlRequest = CreateLinkInput;
export type ShortenUrlResponse = LinkResponse;

export type GetLinksResponse = {
  links: LinkResponse[];
  total: number;
  page: number;
  limit: number;
};

export type LinkStatsResponse = {
  link: LinkResponse;
  recentClicks: LinkClick[];
};
