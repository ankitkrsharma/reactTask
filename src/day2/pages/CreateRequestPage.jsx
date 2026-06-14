import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RequestForm from "../../components/RequestForm";
import useFetch from "../../day3/hooks/useFetch";

function CreateRequestPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: categories, loading, error } = useFetch("/categories");

  if (loading) {
    return (
      <div className="container mt-4">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Create Request</h2>

        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate(user.role === "admin" ? "/admin-dashboard" : "/student-dashboard")
          }
        >
          Back
        </button>
      </div>

      <RequestForm categories={categories} currentUser={user} />
    </div>
  );
}

export default CreateRequestPage;