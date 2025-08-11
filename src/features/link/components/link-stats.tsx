"use client";

import { useParams } from "next/navigation";
import { useGetLinkStats } from "../hooks";
import { StatsLoadingSkeleton } from "./stats-loading-skeleton";
import { StatsErrorState } from "./stats-error-state";
import { StatsHeader } from "./stats-header";
import { LinkInfoCard } from "./link-info-card";
import { StatsCards } from "./stats-cards";
import { RecentClicksList } from "./recent-clicks-list";

export function LinkStats() {
  const params = useParams();
  const shortCode = params.shortCode as string;

  const { data: statsData, isLoading, error } = useGetLinkStats(shortCode);

  if (isLoading) {
    return <StatsLoadingSkeleton />;
  }

  if (error || !statsData) {
    return <StatsErrorState />;
  }

  const { link, recentClicks } = statsData;

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <StatsHeader />
        <LinkInfoCard link={link} />
        <StatsCards link={link} recentClicks={recentClicks} />
        <RecentClicksList recentClicks={recentClicks} />
      </div>
    </div>
  );
}
