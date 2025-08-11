import Skeleton from "@/components/skeleton/skeleton";

export const StatsLoadingSkeleton = () => (
  <div className="min-h-screen bg-[#F2F2F2] p-4">
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-8 w-48 rounded-md" />
      </div>

      <div className="bg-white border border-[#5C636E]/20 rounded-xl p-6 space-y-4">
        <Skeleton className="h-6 w-32 rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16 rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="bg-white border border-[#5C636E]/20 rounded-xl p-6 text-center space-y-3"
          >
            <Skeleton className="h-8 w-8 rounded-full mx-auto" />
            <Skeleton className="h-8 w-16 rounded-md mx-auto" />
            <Skeleton className="h-4 w-24 rounded-md mx-auto" />
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#5C636E]/20 rounded-xl p-6 space-y-4">
        <Skeleton className="h-6 w-36 rounded-md" />
        <div className="space-y-3">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-[#F2F2F2] rounded-md"
            >
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-8 rounded-md" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-3 w-40 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
