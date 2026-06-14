import { useMemo, useState } from "react";

const initialFilters = {
  search: "",
  category: "",
  status: "",
  priority: "",
  sortBy: "latest",
};

function useRequestFilters(requests) {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({ ...initialFilters });
  };

  const filteredRequests = useMemo(() => {
    const searchText = filters.search.trim().toLowerCase();
    let result = [...requests];

    if (searchText) {
      result = result.filter((request) =>
        request.title.toLowerCase().includes(searchText)
      );
    }

    if (filters.category) {
      result = result.filter((request) => request.category === filters.category);
    }

    if (filters.status) {
      result = result.filter((request) => request.status === filters.status);
    }

    if (filters.priority) {
      result = result.filter((request) => request.priority === filters.priority);
    }

    result.sort((a, b) => {
      if (filters.sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (filters.sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return result;
  }, [requests, filters]);

  return {
    filters,
    handleFilterChange,
    clearFilters,
    filteredRequests,
    setFilters,
  };
}

export default useRequestFilters;