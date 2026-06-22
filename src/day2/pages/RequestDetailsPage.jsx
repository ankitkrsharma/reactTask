import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../day1/api/api";
import { useAuth } from "../../context/AuthContext";

function RequestDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRequest = async () => {
    setLoading(true);
    const response = await api.get(`/requests/${id}`);
    setRequest(response.data);
    setStatus(response.data.status);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const updateStatus = async () => {
    await api.patch(`/requests/${id}`, { status });
    fetchRequest();
  };

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  if (!request) {
    return <div className="container py-5 alert alert-danger">Request not found.</div>;
  }

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4">Request Details</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <p><strong>Title:</strong> {request.title}</p>
          <p><strong>Description:</strong> {request.description}</p>
          <p><strong>Category:</strong> {request.category}</p>
          <p><strong>Room No:</strong> {request.roomNo}</p>
          <p><strong>Priority:</strong> {request.priority}</p>
          <p><strong>Status:</strong> {request.status}</p>
          <p><strong>Student Name:</strong> {request.studentName}</p>
          <p><strong>Student ID:</strong> {request.studentId}</p>
          <p><strong>Created At:</strong> {request.createdAt}</p>

          {user.role === "admin" && (
            <div className="mt-4">
              <label className="form-label">Update Status</label>
              <select
                className="form-select mb-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <button className="btn btn-warning me-2" onClick={updateStatus}>
                Save Status
              </button>
            </div>
          )}

          <button
            className="btn btn-outline-secondary mt-4"
            onClick={() =>
              navigate(user.role === "admin" ? "/admin-dashboard" : "/student-dashboard")
            }
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailsPage;