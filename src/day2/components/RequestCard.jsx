import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RequestCard({ request, isAdmin, onStatusUpdate }) {
  const [status, setStatus] = useState(request.status);

  useEffect(() => {
    setStatus(request.status);
  }, [request.status]);

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <h5 className="mb-1">{request.title}</h5>
            <p className="text-muted mb-1">
              {request.category} • Room {request.roomNo}
            </p>
            <p className="mb-1">
              <strong>Priority:</strong> {request.priority}
            </p>
            <p className="mb-1">
              <strong>Status:</strong> {request.status}
            </p>
            <small className="text-muted">
              Created At: {new Date(request.createdAt).toLocaleDateString()}
            </small>
          </div>

          <div className="text-end">
            <Link to={`/request/${request.id}`} className="btn btn-outline-primary btn-sm mb-2">
              View Details
            </Link>

            {isAdmin && (
              <div>
                <select
                  className="form-select form-select-sm mb-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <button
                  type="button"
                  className="btn btn-warning btn-sm"
                  onClick={() => onStatusUpdate(request.id, status)}
                >
                  Update Status
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;