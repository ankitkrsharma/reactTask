import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SummaryCards from "../../day1/components/SummaryCards";
import RequestList from "../../day1/components/RequestList";
import useFetch from "../../day3/hooks/useFetch";
import useRequestFilters from "../../day3/hooks/useRequestFilters";
import FilterBar from "../../day3/components/FilterBar";
import StudentInsights from "../../day3/components/StudentInsights";

function StudentDashboard() {
  const { user, logout } = useAuth();

  const {
    data: requests,
    loading: requestsLoading,
    error: requestsError,
  } = useFetch(user ? `/requests?studentId=${user.id}` : null);

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
    const highPriority = requests.filter((r) => r.priority === "High").length;

    const latestComplaint =
      [...requests].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )[0] || null;

    return {
      total: requests.length,
      open,
      inProgress,
      resolved,
      highPriority,
      latestComplaint,
    };
  }, [requests]);

  const loading = requestsLoading || categoriesLoading;
  const error = requestsError || categoriesError;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Student Dashboard</h2>
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

          <StudentInsights
            stats={{
              total: summary.total,
              open: summary.open,
              resolved: summary.resolved,
              highPriority: summary.highPriority,
              latestComplaint: summary.latestComplaint,
            }}
          />

          <FilterBar
            filters={filters}
            onChange={handleFilterChange}
            onClear={clearFilters}
            categories={categories}
          />

          <h4 className="mb-3">
            My Complaints1
          </h4>

          <RequestList requests={filteredRequests} />
        </>
      )}
    </div>
  );
}

export default StudentDashboard;