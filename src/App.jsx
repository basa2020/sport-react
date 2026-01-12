import { useState, useMemo, Suspense, lazy } from "react";
import { fetchApiLeagues } from "./api";

import useDebounce from "./hooks/useDebounce";
import useFilterData from "./hooks/useFilterData";
import useFetchData from "./hooks/useFetchData";

const  LeaguesList  = lazy(() => import("./components/LeaguesList"));
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { Dropdown } from "./components/Dropdown";
import { LoadingSkeleton } from "./components/LoadingSkeleton";

const App = () => {
  const {
    data: leagues,
    loading: isLoading,
    error,
  } = useFetchData([], fetchApiLeagues,true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const debouncedSearchQuery = useDebounce(searchTerm, 500);
  const filteredLeagues = useFilterData(
    leagues || [],
    debouncedSearchQuery,
    selectedSport
  );
  const availableSportOptions = useMemo(
    () => [...new Set(filteredLeagues.map((league) => league.strSport))],
    [filteredLeagues]
  );
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <Header />
      <main className="w-full max-w-7xl">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10">
          <div className="flex flex-col mb-6 md:flex-row gap-4">
            <SearchBar
              value={searchTerm}
              onChange={(val) => {
                setSearchTerm(val);
              }}
              className="flex-1"
            />
            <Dropdown
              value={selectedSport}
              options={availableSportOptions.map((sport) => ({
                label: sport,
                value: sport,
              }))}
              onChange={(val) => {
                setSelectedSport(val);
              }}
            />
          </div>
          <Suspense fallback={<LoadingSkeleton count={20} />}>
            <LeaguesList
              leagues={filteredLeagues}
              isLoading={isLoading}
              error={error}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
};
export default App;
