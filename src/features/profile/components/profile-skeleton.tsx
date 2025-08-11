import Skeleton from "@/components/skeleton/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProfileHeaderSkeleton = () => (
  <Card className="bg-white border-[#5C636E]/20 shadow-lg">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-8 w-48 rounded-md" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-8 w-12 ml-auto rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </div>
    </CardHeader>
  </Card>
);

const TopLinkCardSkeleton = () => (
  <Card className="bg-white border-[#5C636E]/20 shadow-md">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-8 rounded-full" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-md" />
          <Skeleton className="h-4 w-8 rounded-md" />
          <Skeleton className="h-4 w-6 rounded-md" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-3 w-20 rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-16 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-24 rounded-md" />
        <Skeleton className="h-4 w-40 rounded-md" />
      </div>
    </CardContent>
  </Card>
);

export const ProfileSkeleton = () => {
  const TOP_LINKS_COUNT = 6;

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileHeaderSkeleton />

        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-6 h-6 rounded-md" />
            <Skeleton className="h-8 w-64 rounded-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: TOP_LINKS_COUNT }, (_, i) => (
              <TopLinkCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
