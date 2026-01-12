import { type ApiError, type League } from "../../types";
import { LeagueCard } from "../LeagueCard";
import { LeagueGrid } from "../LeagueGrid";
import { EmptyState } from "../EmptyState";
import { ErrorState } from "../ErrorState";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { fetchApiLeagues } from "../../api";

export interface LeagueListProps {
  leagues: League[];
  isLoading?: boolean;
  error?: ApiError | null;
}

const LeagueList = ({ leagues, error, isLoading }: LeagueListProps) => {
   if (error) {
    return <ErrorState error={error} />;
  }

  if (isLoading) {
    return <LoadingSkeleton count={20} />;
  }

  if (!leagues || leagues.length === 0) {
    return <EmptyState message={"No leagues found"} />;
  }

  return (
    <LeagueGrid>
      {leagues.map((league) => (
        <LeagueCard key={league.idLeague} league={league} />
      ))}
    </LeagueGrid>
  );
};
LeagueList.displayName = "LeagueList";
export default LeagueList;
