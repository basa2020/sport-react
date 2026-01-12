import { Search, Filter, Frown } from "lucide-react";
import { twMerge } from "tailwind-merge";

export interface EmptyStateProps {
  searchQuery?: string;
  selectedSport?: string;
  onClearFilters?: () => void;
  message?: string;
  className?: string;
}

export function EmptyState({
  searchQuery,
  selectedSport,
  onClearFilters,
  message,
  className,
}: EmptyStateProps) {
  const hasFilters = searchQuery || selectedSport;

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center py-16 px-4",
        className
      )}
    >
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        {hasFilters ? (
          <Filter className="w-8 h-8 text-gray-400" />
        ) : message ? (
          <Frown className="w-8 h-8 text-gray-400" />
        ) : (
          <Search className="w-8 h-8 text-gray-400" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {message || (hasFilters ? "No leagues found" : "No leagues available")}
      </h3>

      <p className="text-gray-600 text-center mb-6 max-w-md">
        {hasFilters
          ? "Try adjusting your search or filters to find what you're looking for."
          : "There are no leagues to display at the moment."}
      </p>

      {hasFilters && onClearFilters && (
        <button
          onClick={onClearFilters}
          className={twMerge(
            "px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium",
            "hover:bg-primary-700 active:bg-primary-800",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "transition-colors duration-200"
          )}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
