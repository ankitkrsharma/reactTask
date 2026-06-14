import { useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import SummaryCards from "../../components/SummaryCards";
import RequestList from "../../components/RequestList";
import useFetch from "../../day3/hooks/useFetch";
import useRequestFilters from "../../day3/hooks/useRequestFilters";
import FilterBar from "../../day3/components/FilterBar";
import AdminOverview from "../../day3/components/AdminOverview";

function AdminDashboard() {
  const { user, logout } = useAuth();

  const {
    data: requests,
    loading: requestsLoading,
    error: requestsError,
    setData: setRequests,
  } = useFetch("/requests");

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/categories");

  const { filters, handleFilterChange, clearFilters, filteredRequests } =
    useRequestFilters(requests);

  const summary = useMemo(() => {
    const open = requests.filter((r) => r.status === "Open").length;
    const inProgress = requests.filter((r) => r.status === "In Progress").length;
    const resolved = requests.filter((r) => r.status === "Resolved").length;
    const highPriorityOpen = requests.filter((r) => r.status === "Open" && r.priority === "High").length;

    return {
      total: requests.length,
      open,
      inProgress,
      resolved,
      highPriorityOpen,
    };
  }, [requests]);

  const categoryCounts = useMemo(() => {
    return categories.map((category) => ({
      name: category.name,
      count: requests.filter((r) => r.category === category.name).length,
    }));
  }, [requests, categories]);

  const loading = requestsLoading || categoriesLoading;
  const error = requestsError || categoriesError;

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/requests/${id}`, { status });

      setRequests((prev) =>
        prev.map((request) =>
          request.id === id
            ? { ...request, status }
            : request
        )
      );
    } catch (err) {
      alert("Could not update status.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Admin Dashboard</h2>
          <p className="text-muted mb-0">
            Welcome, {user.name}
          </p>
        </div>

        <div>
          <Link
            to="/create-request"
            className="btn btn-primary me-2"
          >
            Create Request
          </Link>

          <button
            className="btn btn-outline-danger"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="alert alert-info">
          Loading complaints...
        </div>
      ) : error ? (
        <div className="alert alert-danger">
          {error}
        </div>
      ) : (
        <>
          <SummaryCards
            total={summary.total}
            open={summary.open}
            inProgress={summary.inProgress}
            resolved={summary.resolved}
          />

          <AdminOverview
            categoryCounts={categoryCounts}
            highPriorityOpen={summary.highPriorityOpen}
          />

          <FilterBar
            filters={filters}
            onChange={handleFilterChange}
            onClear={clearFilters}
            categories={categories}
          />

          <h4 className="mb-3">
            All Complaints
          </h4>

          <RequestList
            requests={filteredRequests}
            isAdmin={true}
            onStatusUpdate={handleStatusUpdate}
          />
        </>
      )}
    </div>
  );
}

export default AdminDashboard;