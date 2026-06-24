import { useEffect, useState } from "react";
import api from "../api/api";
import SummaryCards from "../components/SummaryCards";
import RequestForm from "../components/components/RequestForm";
import SearchFilter from "../components/SearchFilter";
import RequestList from "../components/components/RequestList";

function DashboardPage() {
  const [requests, setRequests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [requestsRes, categoriesRes] = await Promise.all([
          api.get("/requests"),
          api.get("/categories"),
        ]);

        setRequests(requestsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestCreated = (newRequest) => {
    setRequests((prev) => [...prev, newRequest]);
  };

  const filteredRequests = requests.filter((request) => {
    const matchesTitle = request.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory =
      filters.category === "" || request.category === filters.category;
    const matchesStatus = filters.status === "" || request.status === filters.status;

    return matchesTitle && matchesCategory && matchesStatus;
  });

  const totalRequests = requests.length;
  const openRequests = requests.filter((request) => request.status === "Open").length;
  const inProgressRequests = requests.filter((request) => request.status === "In Progress").length;
  const resolvedRequests = requests.filter((request) => request.status === "Resolved").length;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading dashboard...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-1">Hostel Maintenance Dashboard</h1>
      <p className="text-muted mb-4">Raise complaints, track status, and filter requests.</p>

      <SummaryCards
        total={totalRequests}
        open={openRequests}
        inProgress={inProgressRequests}
        resolved={resolvedRequests}
      />

      <div className="row g-4">
        <div className="col-lg-5">
          <RequestForm
            categories={categories}
            onRequestCreated={handleRequestCreated}
          />
        </div>

        <div className="col-lg-7">
          <SearchFilter
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />

          <RequestList requests={filteredRequests} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;