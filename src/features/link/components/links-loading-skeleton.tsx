import Skeleton from "@/components/skeleton/skeleton";

interface LinksLoadingSkeletonProps {
  linksPerPage: number;
}

export const LinksLoadingSkeleton = ({
  linksPerPage,
}: LinksLoadingSkeletonProps) => (
  <div className="min-h-screen bg-[#F2F2F2] p-4">
    <div className="max-w-6xl mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="h-32 bg-gray-300 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: linksPerPage }, (_, i) => (
            <Skeleton className="w-full h-60 rounded-xl" key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
