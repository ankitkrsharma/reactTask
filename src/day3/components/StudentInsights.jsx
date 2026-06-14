function StudentInsights({ stats }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">Student Insights</h5>

        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="border rounded p-3">
              <small className="text-muted">Total Complaints</small>
              <h3 className="mb-0">{stats.total}</h3>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="border rounded p-3">
              <small className="text-muted">Open Complaints</small>
              <h3 className="mb-0">{stats.open}</h3>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="border rounded p-3">
              <small className="text-muted">Resolved Complaints</small>
              <h3 className="mb-0">{stats.resolved}</h3>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="border rounded p-3">
              <small className="text-muted">High Priority</small>
              <h3 className="mb-0">{stats.highPriority}</h3>
            </div>
          </div>
        </div>

        <div className="alert alert-light border mt-3 mb-0">
          <strong>Latest complaint:</strong>{" "}
          {stats.latestComplaint
            ? `${stats.latestComplaint.title} • ${stats.latestComplaint.status}`
            : "No complaints yet"}
        </div>
      </div>
    </div>
  );
}

export default StudentInsights;