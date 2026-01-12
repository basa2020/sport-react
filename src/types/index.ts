export type ApiError = {
  status: number;
  message: string;
};

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string | null;
}

/**
 * API response for fetching all leagues
 */
export interface LeaguesResponse {
  leagues: League[] | null;
}

export interface LeagueBadges {
  strBadge: string | null ;
  strSeason: string | null;
}
