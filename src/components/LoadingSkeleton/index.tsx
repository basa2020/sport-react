import { LeagueGrid } from "../LeagueGrid";

export interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export function LoadingSkeleton({
  count = 20,
  className,
}: LoadingSkeletonProps) {
  return (
    <LeagueGrid className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-5 animate-fade-in"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 space-y-3">
              {/* Title skeleton */}
              <div className="h-6 bg-gray-200 rounded animate-pulse-subtle w-3/4" />
              {/* Badge skeleton */}
              <div className="h-5 bg-gray-200 rounded animate-pulse-subtle w-1/2" />
            </div>
            {/* Icon skeleton */}
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse-subtle" />
          </div>
        </div>
      ))}
    </LeagueGrid>
  );
}
