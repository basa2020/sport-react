import { useState, useEffect, useCallback } from "react";
import { ApiError } from "../types";

const useFetchData = <T>(
  initialData: T,
  fetchDataFunction: () => Promise<T>,
  initialLoad: boolean = false
) => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchDataFunction();
      setData(response);
    } catch (err) {
      setError(err as ApiError);
      setData(initialData);
    } finally {
      setLoading(false);
    }
  }, [fetchDataFunction]);

  useEffect(() => {
    if (initialLoad) {
      fetchData();
    }
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
