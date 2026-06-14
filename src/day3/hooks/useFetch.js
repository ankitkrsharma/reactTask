import { useCallback, useEffect, useState } from "react";
import api from "../../api/api";

function useFetch(endpoint, immediate = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return { data, setData, loading, error, refetch: fetchData };
}

export default useFetch;