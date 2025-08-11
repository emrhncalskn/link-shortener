"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { useGetMyLinks } from "@/features/link/hooks";
import { ProfileSkeleton } from "./profile-skeleton";
import { ProfileHeader } from "./profile-header";
import { TopLinksSection } from "./top-links-section";

const TOP_LINKS_COUNT = 6;

export default function Profile() {
  const {
    userProfile,
    isLoading: userLoading,
    refreshUserProfile,
  } = useUserProfile();
  const { data: linksData, isLoading: linksLoading } = useGetMyLinks(1, 50);

  const topClickedLinks = linksData?.links
    ? [...linksData.links]
        .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
        .slice(0, TOP_LINKS_COUNT)
    : [];

  if (userLoading || linksLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileHeader
          userProfile={userProfile}
          onProfileUpdate={refreshUserProfile}
        />
        <TopLinksSection links={topClickedLinks} />
      </div>
    </div>
  );
}
