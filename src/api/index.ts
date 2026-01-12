import apiClient from "../client";
import { League, LeagueBadges, LeaguesResponse } from "../types";

export const fetchApiLeagues = async (): Promise<League[]> => {
  const response = await apiClient.get<LeaguesResponse>("/all_leagues.php");
  if (response.data) {
    const leagues = response.data.leagues ?? [];

    return leagues;
  } else {
    return Promise.reject(response);
  }
};

export const fetchApiLeagueDetails = async (
  leagueId: string
): Promise<LeagueBadges[]> => {
  if (!leagueId) return Promise.reject();
  const response = await apiClient.get(`/search_all_seasons.php`, {
    params: {
      badge: 1,
      id: leagueId,
    },
  });
  if (response.data) return response.data.seasons;
  return Promise.reject(response);
};
